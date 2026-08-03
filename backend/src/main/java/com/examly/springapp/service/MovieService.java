package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exception.MovieException;
import com.examly.springapp.model.Movie;
import com.examly.springapp.repository.MovieRepository;

@Service
public class MovieService {

    @Autowired
    private MovieRepository repo;

    // Add new movie
    public Movie addMovie(Movie movie) throws MovieException {

        Optional<Movie> existing = repo.findByTitle(movie.getTitle());

        if (existing.isPresent()) {
            throw new MovieException("Movie with title '" + movie.getTitle() + "' already exists");
        }

        return repo.save(movie);
    }

    // Get all movies
    public List<Movie> getAllMovies() {
        return repo.findAll();
    }

    // Get movie by ID
    public Movie getMovieById(int id) throws MovieException {

        Movie movie = repo.findById(id).orElse(null);

        if (movie == null) {
            throw new MovieException("Movie not found with ID: " + id);
        }

        return movie;
    }

    // Update movie
    public Movie updateMovie(int id, Movie movie) throws MovieException {

        Optional<Movie> mv = repo.findById(id);

        if (mv.isEmpty()) {
            throw new MovieException("Cannot update. Movie not found with ID: " + id);
        }

        Movie existing = mv.get();

        existing.setTitle(movie.getTitle());
        existing.setDirector(movie.getDirector());
        existing.setGenre(movie.getGenre());
        existing.setReleaseDate(movie.getReleaseDate());
        existing.setPosterImage(movie.getPosterImage());

        return repo.save(existing);
    }

    // Delete movie
    public boolean deleteMovie(int id) throws MovieException {

        Movie movie = repo.findById(id).orElse(null);

        if (movie == null) {
            throw new MovieException("Cannot delete. Movie not found with ID: " + id);
        }

        repo.delete(movie);

        return true;
    }
}
