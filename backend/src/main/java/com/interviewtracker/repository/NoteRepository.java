package com.interviewtracker.repository;

import com.interviewtracker.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Integer> {
    List<Note> findByUserId(Integer userId);
    List<Note> findByUserIdOrderByTitleAsc(Integer userId);
}
