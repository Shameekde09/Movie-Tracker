package com.examly.springapp.controller;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.examly.springapp.exception.MovieException;
import com.examly.springapp.model.Movie;
import com.examly.springapp.service.MovieService;

@RestController
@CrossOrigin(origins="https://8081-daecbebabfcfbeabebabebeeeecabfced.premiumproject.examly.io")
public class MovieController {

    @Autowired
    private MovieService service;

    @PostMapping("/api/movies")
    public ResponseEntity<Movie> addMovie(
            @RequestParam("title") String title,
            @RequestParam("director") String director,
            @RequestParam("genre") String genre,
            @RequestParam("releaseDate") String releaseDate,
            @RequestParam("posterImage") MultipartFile file)
            throws IOException, MovieException {

        Movie movie = new Movie();

        movie.setTitle(title);
        movie.setDirector(director);
        movie.setGenre(genre);
        movie.setReleaseDate(releaseDate);

        String base64Image = Base64.getEncoder().encodeToString(file.getBytes());
        movie.setPosterImage(base64Image);

        Movie saved = service.addMovie(movie);

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("/api/movies")
    public ResponseEntity<List<Movie>> getAllMovies() {

        List<Movie> list = service.getAllMovies();

        return ResponseEntity.ok(list);
    }

    @GetMapping("/api/movies/{movieId}")
    public ResponseEntity<Movie> getMovieById(@PathVariable int movieId)
            throws MovieException {

        Movie movie = service.getMovieById(movieId);

        return ResponseEntity.ok(movie);
    }

    @PutMapping("/api/movies/{movieId}")
    public ResponseEntity<Movie> updateMovie(
            @PathVariable int movieId,
            @RequestParam("title") String title,
            @RequestParam("director") String director,
            @RequestParam("genre") String genre,
            @RequestParam("releaseDate") String releaseDate,
            @RequestParam(value = "posterImage", required = false) MultipartFile file)
            throws IOException, MovieException {

        Movie movie = service.getMovieById(movieId);

        movie.setTitle(title);
        movie.setDirector(director);
        movie.setGenre(genre);
        movie.setReleaseDate(releaseDate);

        if (file != null && !file.isEmpty()) {
            String base64Image = Base64.getEncoder().encodeToString(file.getBytes());
            movie.setPosterImage(base64Image);
        }

        Movie updated = service.updateMovie(movieId, movie);

        return ResponseEntity.status(HttpStatus.CREATED).body(updated);
    }

    @DeleteMapping("/api/movies/{movieId}")
    public ResponseEntity<String> deleteMovie(@PathVariable int movieId)
            throws MovieException {

        service.deleteMovie(movieId);

        return ResponseEntity.ok("Movie deleted successfully");
    }

}
