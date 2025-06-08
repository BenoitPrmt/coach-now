package com.coachnow.api.model.service;

import com.coachnow.api.model.entity.Booking;
import com.coachnow.api.model.entity.Rating;
import com.coachnow.api.model.entity.User;
import com.coachnow.api.model.repository.BookingRepository;
import com.coachnow.api.model.repository.RatingRepository;
import com.coachnow.api.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private RatingRepository ratingRepository;

    public List<User> selectAll() {
        return (List<User>) userRepository.findAll();
    }

    public User select(String id) {
        Optional<User> optionalPlayer = userRepository.findById(id);
        if (optionalPlayer.isEmpty()) {
            return null;
        }
        List<Booking> booking = bookingRepository.findBookingsByUser(optionalPlayer.get());
        optionalPlayer.get().setBookings(booking);
        List<Rating> ratings = ratingRepository.findRatingsByUser(optionalPlayer.get());
        if (ratings != null) {
            optionalPlayer.get().setRatings(ratings);
        }
        return optionalPlayer.get();
    }

    public User registerUser(User user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        return userRepository.save(user);
    }

    public void updateUserPassword(User user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        userRepository.save(user);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public void delete(String id) {
        userRepository.deleteById(id);
    }

    public void delete(User user) {
        userRepository.delete(user);
    }
}