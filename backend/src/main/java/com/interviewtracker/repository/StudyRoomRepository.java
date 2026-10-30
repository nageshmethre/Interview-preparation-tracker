package com.interviewtracker.repository;

import com.interviewtracker.entity.StudyRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface StudyRoomRepository extends JpaRepository<StudyRoom, Integer> {
    Optional<StudyRoom> findByRoomCode(String roomCode);
    List<StudyRoom> findByIsPrivateFalseOrderByActiveParticipantsDesc();
}
