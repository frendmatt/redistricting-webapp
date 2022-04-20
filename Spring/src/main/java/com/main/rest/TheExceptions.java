package com.main.rest;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public class TheExceptions
{
    @ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Item Not Found")
    public static class ItemNotFoundException extends RuntimeException
    {
    }
}