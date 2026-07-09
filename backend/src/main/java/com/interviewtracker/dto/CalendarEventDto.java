package com.interviewtracker.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CalendarEventDto {
    private String id;
    private String title;
    private LocalDateTime start;
    private LocalDateTime end;
    private String type; // e.g. "INTERVIEW", "STUDY", "REMINDER"
    private String color; // hex color code matching the event type in UI
}
