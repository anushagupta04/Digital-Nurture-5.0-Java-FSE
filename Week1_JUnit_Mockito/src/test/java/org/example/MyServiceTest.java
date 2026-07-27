package org.example;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class MyServiceTest {

    @Test
    void testMockingAndStubbing() {
        ExternalApi mockApi = mock(ExternalApi.class);

        when(mockApi.getData()).thenReturn("Mock Data");

        MyService service = new MyService(mockApi);

        assertEquals("Mock Data", service.fetchData());
    }

    @Test
    void testVerifyInteraction() {
        ExternalApi mockApi = mock(ExternalApi.class);

        MyService service = new MyService(mockApi);
        service.fetchData();

        verify(mockApi).getData();
    }
}