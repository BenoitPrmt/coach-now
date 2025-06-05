package com.coachnow.api.controller;

import com.coachnow.api.model.entity.Rating;
import com.coachnow.api.model.entity.dto.RatingDTO;
import com.coachnow.api.model.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class RatingController {

    @Autowired
    RatingService ratingService;

    @GetMapping("/ratings")
    public List<RatingDTO> all() {
        List<Rating> ratings = ratingService.selectAll();
        List<RatingDTO> listDTO = new ArrayList<RatingDTO>();
        for(Rating rating : ratings) {
            listDTO.add(new RatingDTO(rating));
        }
        return listDTO;
    }

    @GetMapping("/rating/{id}")
    public RatingDTO get(@PathVariable String id) {
        Rating rating = ratingService.select(id);

        return rating != null ? new RatingDTO(rating) : null;

    }

    @PostMapping("/rating")
    public RatingDTO create(@RequestBody Rating rating) {
        return new RatingDTO(ratingService.save(rating));
    }

    @PutMapping("/rating/{id}")
    public RatingDTO create(@RequestBody Rating rating, @PathVariable String id) {
        rating.setId(id);
        return new RatingDTO(ratingService.save(rating));
    }

    @DeleteMapping("/rating/{id}")
    public void deletePlayer(@PathVariable String id) {ratingService.delete(id);
    }
}
