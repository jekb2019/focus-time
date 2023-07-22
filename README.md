# Documentation

## Class: CountdownTimer

CountdownTimer is a class representing a simple countdown timer.
It is capable of following functionalities.

- Starting a timer
- Pausing a timer
- Resuming a timer
- Destroying a timer

### States

```
type TimerState = 'idle' | 'started' | 'paused' | 'finished' | 'destroyed';
```

idle: timer is created but not started yet
started: timer is started and running
paued: timer is paused at a specific second
finished: timer reached 0 seconds and not running
destroyed: timer is stopped and not usable any more (currentSeconds is forced to 0)

### Timer Events

## Class CycleTimer

### Functionalities

pomodoro-short-pomodoro-short-pomodoro-short-pomodoro-long

- set focus time (default 25 mins)
- set short break time (default 5 mins)
- set long break time (default 30 mins)
- soft lock long break until 4 pomodoro

# Todo (12 July)

- Am I gonna leave this repo public? - IDK
- Write documentation explaining directory structure
- Add validations to settings modal input values
- Have UI guards for inputs and texts that are too long
