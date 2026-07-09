package com.interviewtracker.controller;

import com.interviewtracker.dto.CalendarEventDto;
import com.interviewtracker.service.CalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/calendar")
public class CalendarController {

    @Autowired
    private CalendarService calendarService;

    @GetMapping("/events")
    public ResponseEntity<List<CalendarEventDto>> getCalendarEvents(Principal principal) {
        return ResponseEntity.ok(calendarService.getCalendarEvents(principal.getName()));
    }
}
