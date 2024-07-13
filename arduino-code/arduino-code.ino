#include <MotorController.h>

DCMotorController motor1 = DCMotorController(14, 26, 27);
const int ledPin = 2;

int pwmValue = 50;
bool motorOn = false;

String lastCommand = "OFF";

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(115200);     // Initialize serial communication at 115200 baud rate
}

void loop() {
  checkSerial();
  if (motorOn) {
    noPattern();
  } else {
    offAll();
  }
  delay(10);
}

// Check serial for command
void checkSerial() {
  if (Serial.available()) {
    String command = Serial.readStringUntil('\n');
    lastCommand = command;
    Serial.print(F("COMMAND:"));
    Serial.println(command);
    if (command.startsWith("PWM:")) {
      setPwmLimit(command);
    } else if (command == "ON") {
      motorOn = true;
    } else if (command == "OFF") {
      motorOn = false;
    } else if (command.startsWith("PATTERN")) {
      int patternNumber = command.substring(7).toInt();
      if (patternNumber >= 1 && patternNumber <= 5) {
        motorOn = true;
        noPattern();
        runPattern(patternNumber);
      }
    }
  }
}

// Set PWM Limit
void setPwmLimit(String command) {
  int newValue = command.substring(4).toInt();
  if (newValue >= 0 && newValue <= 255) {
    pwmValue = newValue;
  }
}

void runPattern(int pattern) {
  while (motorOn) {
    digitalWrite(ledPin, HIGH);

    switch (pattern) {
      case 1:
        pattern1();
        break;
      case 2:
        pattern2();
        break;
      case 3:
        pattern3();
        break;
      case 4:
        pattern4();
        break;
      case 5:
        pattern5();
        break;
      default:
        Serial.println(F("Invalid pattern received!"));
    }

    checkSerial();
    if (!motorOn) {
      break;
    }
  }
}

// Patterns
void pattern1() {
  int lowSpeed = 50;
  int pulseDuration = 200;

  motor1.forward(pwmValue);
  delay(pulseDuration);
  motor1.forward(lowSpeed);
  delay(pulseDuration);
}

void pattern2() {
  for (int i = 50; i <= pwmValue; i += 5) {
    motor1.forward(i);
    delay(50);
  }
  for (int i = pwmValue; i >= 50; i -= 5) {
    motor1.forward(i);
    delay(50);
  }
}

void pattern3() {
  int burstDuration = 100;

  motor1.forward(pwmValue);
  delay(burstDuration);
  motor1.brake();
  delay(burstDuration);
}

void pattern4() {
  int speed = random(50, pwmValue + 1);
  int duration = random(100, 500);

  motor1.forward(speed);
  delay(duration);
  motor1.brake();
  delay(duration);
}

void pattern5() {
  int lowSpeed = 50;
  int step = 10;
  for (int peakSpeed = 50; peakSpeed <= pwmValue; peakSpeed += step) {
    motor1.forward(peakSpeed);
    delay(200);
    motor1.forward(lowSpeed);
    delay(200);
    checkSerial();
    if (!motorOn)
      return;
  }
}

// No Pattern
void noPattern() {
  motor1.forward(pwmValue);
  digitalWrite(ledPin, HIGH);  // Turn on the LED
}

// Off all
void offAll() {
  motor1.brake();
  digitalWrite(ledPin, LOW);  // Turn off the LED
}