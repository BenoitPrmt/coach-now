package com.coachnow.api.web.request.coach;

import com.coachnow.api.types.Gender;
import com.coachnow.api.types.Level;
import com.coachnow.api.types.Sports;
import lombok.Data;

import java.util.Set;

@Data
public class CoachCreation {
    private String birthdate;
    private String profilePictureUrl;
    private Float hourlyRate;
    private Set<Sports> sports;
    private Set<Level> levels;
    private Gender gender;
    private String userId;
}
