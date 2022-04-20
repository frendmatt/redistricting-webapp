package com.main.rest;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import java.util.HashMap;
import java.util.Map;

public class SessionManager
{

    private static HashMap<String, HttpSession> sessions = new HashMap<String, HttpSession>();

    public static HttpSession getSession(String sessionId)
    {
        if(sessions.containsKey(sessionId))
            return sessions.get(sessionId);
        return null;
    }

    public static void addSession(HttpSession session)
    {
        if(sessions.containsKey(session.getId()))
            sessions.remove(session.getId());
        sessions.put(session.getId(), session);
    }

    public static void removeSession(String sessionId)
    {
        if(sessions.containsKey(sessionId))
            removeSession(sessions.get(sessionId));
    }

    public static void removeSession(HttpSession session)
    {
        if(sessions.containsKey(session.getId()))
            sessions.remove(session.getId());
        session.invalidate();
    }
}