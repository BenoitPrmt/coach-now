package com.coachnow.api.controller;

import com.coachnow.api.model.entity.Coach;
import com.coachnow.api.model.entity.dto.CoachDTO;
import com.coachnow.api.model.service.CoachService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8000")
@RequestMapping("/api")
public class CoachController {

    @Autowired
    CoachService coachService;

    @GetMapping("/coachs")
    public List<CoachDTO> all() {
        List<Coach> coachs = coachService.selectAll();
        List<CoachDTO> listDTO = new ArrayList<CoachDTO>();
        for(Coach coach : coachs) {
            listDTO.add(new CoachDTO(coach));
        }
        return listDTO;
    }

    @GetMapping("/coach/{id}")
    public CoachDTO get(@PathVariable String id) {
        return new CoachDTO(coachService.select(id));
    }

    @PostMapping("/coach")
    public CoachDTO create(@RequestBody Coach coach) {
        return new CoachDTO(coachService.save(coach));
    }

    @PutMapping("/coach/{id}")
    public CoachDTO create(@RequestBody Coach coach, @PathVariable String id) {
        coach.setId(id);
        return new CoachDTO(coachService.save(coach));
    }

    @DeleteMapping("/coach/{id}")
    public void deleteCoach(@PathVariable String id) {
        coachService.delete(id);
    }
}
