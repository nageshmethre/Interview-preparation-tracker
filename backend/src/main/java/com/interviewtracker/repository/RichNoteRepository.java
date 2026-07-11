package com.interviewtracker.repository;

import com.interviewtracker.entity.RichNote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RichNoteRepository extends JpaRepository<RichNote, Integer> {
    List<RichNote> findByUserId(Integer userId);
    List<RichNote> findByUserIdAndFolderId(Integer userId, Integer folderId);
    List<RichNote> findByUserIdAndTitleContainingIgnoreCase(Integer userId, String query);
}
