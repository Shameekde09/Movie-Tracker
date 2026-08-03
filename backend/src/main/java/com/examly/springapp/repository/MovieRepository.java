package com.examly.springapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.Movie;

public interface MovieRepository extends JpaRepository<Movie, Integer> {

    Optional<Movie> findByTitle(String title);

}
