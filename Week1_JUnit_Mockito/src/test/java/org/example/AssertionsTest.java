package org.example;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class AssertionsTest {

    @Test
    void testAssertions() {
        assertEquals(5, 2 + 3);
        assertTrue(10 > 5);
        assertFalse(5 > 10);
        assertNotNull("Hello");
        assertNull(null);
    }
}