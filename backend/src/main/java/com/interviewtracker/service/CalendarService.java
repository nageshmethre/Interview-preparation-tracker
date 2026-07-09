package com.interviewtracker.service;

import com.interviewtracker.dto.CalendarEventDto;
import java.util.List;

public interface CalendarService {
    List<CalendarEventDto> getCalendarEvents(String email);
}
