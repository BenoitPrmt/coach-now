package com.coachnow.api.model.entity.dto;

import com.coachnow.api.model.entity.Coach;
import lombok.Data;

@Data
public class CoachDTO {
    private String id;

    public CoachDTO(Coach coach) {
        this.id = coach.getId();

    }

}
