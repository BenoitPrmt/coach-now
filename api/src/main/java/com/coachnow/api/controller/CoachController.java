package com.coachnow.api.controller;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.coachnow.api.web.request.coach.CoachUpdate;
import com.coachnow.api.web.response.coach.IsCoachAvailable;
import com.coachnow.api.web.response.coach.unavailability.Unavailability;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.coachnow.api.model.entity.Coach;
import com.coachnow.api.model.entity.User;
import com.coachnow.api.model.entity.dto.CoachDTO;
import com.coachnow.api.model.service.CoachService;
import com.coachnow.api.model.service.UserService;
import com.coachnow.api.web.request.coach.CoachCreation;
import com.coachnow.api.web.response.coach.availability.DayAvailability;
import com.coachnow.api.web.response.pagination.PaginatedElements;

@RestController
@RequestMapping("/api")
public class CoachController {

    @Autowired
    CoachService coachService;

    @Autowired
    UserService userService;

    @GetMapping("/coachs")
    public ResponseEntity<PaginatedElements<CoachDTO>> all(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer pageSize,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String filter,
            @RequestParam(required = false) String filterBy,
            @RequestParam(value = "sort", required = false, defaultValue = "lastname") String sortBy
    ) {
        try {
            Optional<String> searchOpt = Optional.ofNullable(search);
            Optional<String> filterOpt = Optional.ofNullable(filter);
            Optional<String> filterByOpt = Optional.ofNullable(filterBy);
            Optional<String> sortByOpt = Optional.ofNullable(sortBy);

            if (page != null) {
                int pageSizeDefault = 10;

                if (page < 0) {
                    throw new IllegalArgumentException("Page index must be 0 or greater.");
                }

                int validPageSize = (pageSize != null && pageSize > 0) ? pageSize : pageSizeDefault;

                List<Coach> coachs = coachService.selectAllWithPagination(page, validPageSize, searchOpt, filterOpt, filterByOpt, sortByOpt);

                List<CoachDTO> listDTO = new ArrayList<>();
                for (Coach coach : coachs) {
                    listDTO.add(new CoachDTO(coach));
                }

                int totalElements = coachService.getTotalCountWithFilters(searchOpt, filterOpt, filterByOpt);
                int totalPages = (int) Math.ceil((double) totalElements / validPageSize);

                return new ResponseEntity<>(
                        new PaginatedElements<>(
                                true, page, validPageSize, totalPages, totalElements, listDTO, searchOpt
                        ),
                        HttpStatus.OK
                );
            }

            List<Coach> coachs = coachService.selectAllWithFilters(searchOpt, filterOpt, filterByOpt, sortByOpt);

            List<CoachDTO> listDTO = new ArrayList<>();
            for (Coach coach : coachs) {
                listDTO.add(new CoachDTO(coach));
            }
            return new ResponseEntity<>(
                    new PaginatedElements<>(
                            false, 0, 0, 0, listDTO.size(), listDTO, searchOpt
                    ),
                    HttpStatus.OK
            );
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/coach/{id}")
    public ResponseEntity<CoachDTO> get(@PathVariable String id) {
        return new ResponseEntity<>(
                Optional.ofNullable(coachService.select(id))
                        .map(CoachDTO::new)
                        .orElse(null),
                HttpStatus.OK
        );
    }

    @PostMapping("/coach")
    public ResponseEntity<CoachDTO> create(@RequestBody CoachCreation coachData) {
        try {
            User coachUser = userService.select(coachData.getUserId());
            if (coachUser == null) {
                throw new IllegalArgumentException("User with id " + coachData.getUserId() + " does not exist.");
            }

            if (!coachUser.isCoach()) {
                throw new IllegalArgumentException("User with id " + coachData.getUserId() + " is not a coach.");
            }

            if (coachService.userHasCoach(coachData.getUserId())) {
                throw new IllegalArgumentException("User with id " + coachData.getUserId() + " is already a coach.");
            }

            Coach coach = new Coach();
            coach.setCoachFromCoachCreation(coachData);
            coach.setUser(coachUser);

            return new ResponseEntity<>(
                    new CoachDTO(coachService.save(coach)),
                    HttpStatus.CREATED
            );
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/coach/{id}")
    public ResponseEntity<CoachDTO> update(@RequestBody CoachUpdate coachUpdate, @PathVariable String id) throws ParseException {
        try {
            Coach existingCoach = coachService.select(id);

            if (existingCoach == null) {
                throw new IllegalArgumentException("Coach with id " + id + " does not exist.");
            }

            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

            if (coachUpdate.getBirthdate() != null) {
                existingCoach.setBirthdate(new java.sql.Date(formatter.parse(coachUpdate.getBirthdate()).getTime()));
            }
            if (coachUpdate.getProfilePictureUrl() != null) {
                existingCoach.setProfilePictureUrl(coachUpdate.getProfilePictureUrl());
            }
            if (coachUpdate.getHourlyRate() != null) {
                existingCoach.setHourlyRate(coachUpdate.getHourlyRate());
            }
            if (coachUpdate.getSports() != null) {
                existingCoach.setSports(coachUpdate.getSports());
            }
            if (coachUpdate.getLevels() != null) {
                existingCoach.setLevels(coachUpdate.getLevels());
            }
            if (coachUpdate.getGender() != null) {
                existingCoach.setGender(coachUpdate.getGender());
            }
            if (coachUpdate.getUserId() != null) {
                User user = userService.select(coachUpdate.getUserId());
                if (user == null) {
                    throw new IllegalArgumentException("User with id " + coachUpdate.getUserId() + " does not exist.");
                }
                existingCoach.setUser(user);
            }

            return new ResponseEntity<>(new CoachDTO(coachService.save(existingCoach)), HttpStatus.OK);
        } catch (IllegalArgumentException | ParseException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/coach/{id}")
    public void deleteCoach(@PathVariable String id) {
        coachService.delete(id);
    }

    @GetMapping("/coach/{coachId}/isAvailable")
    public ResponseEntity<IsCoachAvailable> isAvailable(
            @PathVariable String coachId,
            @RequestParam(value = "startDate", defaultValue = "") String startDate,
            @RequestParam(value = "endDate", defaultValue = "") String endDate
    ) throws ParseException {

        DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        try {
            IsCoachAvailable isAvailable = coachService.isCoachAvailable(
                    coachId,
                    startDate.isEmpty() ? null : formatter.parse(startDate),
                    endDate.isEmpty() ? null : formatter.parse(endDate)
            );

            return new ResponseEntity<>(isAvailable, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
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

    @GetMapping("/coach/{coachId}/unavailabilities")
    public ResponseEntity<List<Unavailability>> getUnavailabilities(
            @PathVariable String coachId
    ) throws ParseException {
        try {
            return new ResponseEntity<List<Unavailability>>(coachService.getUnavailabilities(coachId), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
