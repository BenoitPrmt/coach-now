package com.coachnow.api.controller;

import com.coachnow.api.model.entity.Coach;
import com.coachnow.api.model.entity.dto.CoachDTO;
import com.coachnow.api.model.service.CoachService;
import com.coachnow.api.model.service.UserService;
import com.coachnow.api.web.response.coach.availability.DayAvailability;
import com.coachnow.api.web.response.pagination.PaginatedElements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CoachController {

    @Autowired
    CoachService coachService;

    @Autowired
    UserService userService;

    @GetMapping("/coachs")
    public PaginatedElements<CoachDTO> all(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer pageSize
    ) {
        if (page != null) {
            int pageSizeDefault = 10;

            if (page < 0) {
                throw new IllegalArgumentException("Page index must be 0 or greater.");
            }

            int validPageSize = (pageSize != null && pageSize > 0) ? pageSize : pageSizeDefault;

            List<Coach> coachs = coachService.selectAllWithPagination(page, validPageSize);

            List<CoachDTO> listDTO = new ArrayList<>();
            for (Coach coach : coachs) {
                listDTO.add(new CoachDTO(coach));
            }
            int totalElements = coachService.selectAll().size();
            int totalPages = (int) Math.ceil((double) totalElements / validPageSize);
            return new PaginatedElements<>(
                    true, page, validPageSize, totalPages, totalElements, listDTO
            );
        }

        List<Coach> coachs = coachService.selectAll();
        List<CoachDTO> listDTO = new ArrayList<>();
        for (Coach coach : coachs) {
            listDTO.add(new CoachDTO(coach));
        }
        return new PaginatedElements<>(
                false, 0, 0, 0, listDTO.size(), listDTO
        );
    }


    @GetMapping("/coach/{id}")
    public CoachDTO get(@PathVariable String id) {
        return new CoachDTO(coachService.select(id));
    }

//    @PostMapping("/coach")
//    public CoachDTO create(@RequestBody CoachCreation coachData) {
//        User coachUser = userService.select(coachData.getUserId());
//        if (coachUser == null) {
//            throw new IllegalArgumentException("User with id " + coachData.getUserId() + " does not exist.");
//        }
//
//        if (!coachUser.isCoach()) {
//            throw new IllegalArgumentException("User with id " + coachData.getUserId() + " is not a coach.");
//        }
//
//        if (coachService.userHasCoach(coachData.getUserId())) {
//            throw new IllegalArgumentException("User with id " + coachData.getUserId() + " is already a coach.");
//        }
//
//        Coach coach = new Coach();
//        coach.setCoachFromCoachCreation(coachData);
//        coach.setUser(coachUser);
//
//        return new CoachDTO(coachService.save(coach));
//    }

    @PutMapping("/coach/{id}")
    public CoachDTO create(@RequestBody Coach coach, @PathVariable String id) {
        coach.setId(id);
        return new CoachDTO(coachService.save(coach));
    }

    @DeleteMapping("/coach/{id}")
    public void deleteCoach(@PathVariable String id) {
        coachService.delete(id);
    }

    @GetMapping("/coach/{coachId}/availabilities")
    public ResponseEntity<List<DayAvailability>> getAvailabilities(
            @PathVariable String coachId,
            @RequestParam(value = "startDate", required = false, defaultValue = "") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam(value = "endDate", required = false, defaultValue = "") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate
    ) throws ParseException {
        try {
            return new ResponseEntity<>(coachService.getAvailabilities(coachId, startDate, endDate), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
