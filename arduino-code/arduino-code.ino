const int motorPin1 = 5;
const int motorPin2 = 6;
const int pwmPin = 9;  // PWM pin to control speed

const int ledPin = 3;  // Pin for the LED

int pwmValue = 50;     // Starting PWM value
bool motorOn = false;  // Motor state

String lastCommand = "OFF";

void setup() {
  pinMode(motorPin1, OUTPUT);
  pinMode(motorPin2, OUTPUT);
  pinMode(pwmPin, OUTPUT);
  pinMode(ledPin, OUTPUT);  // Initialize LED pin
  Serial.begin(9600);       // Initialize serial communication at 9600 baud rate
}

void loop() {
  checkSerial();  // Always check for serial input

  // Set the direction of the motor
  if (motorOn) {
    noPattern();
  } else {
    offAll();
  }
  delay(10);  // Add a small delay to control the speed of change
}

// Check serial for command
void checkSerial() {
  if (Serial.available()) {
    String command = Serial.readStringUntil('\n');
    lastCommand = command;
    Serial.print("COMMAND:");
    Serial.println(command);
    if (command.startsWith("PWM:")) {
      int newValue = command.substring(4).toInt();
      if (newValue >= 50 && newValue <= 255) {
        pwmValue = newValue;
      }
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

// Run Pattern
void runPattern(int pattern) {
  while (motorOn) {
    digitalWrite(ledPin, HIGH);
    if (pattern == 1) {
      pattern1();
    } else if (pattern == 2) {
      pattern2();
    } else if (pattern == 3) {
      pattern3();
    } else if (pattern == 4) {
      pattern4();
    } else if (pattern == 5) {
      pattern5();
    }
    checkSerial();
    if (!motorOn)
      break;
  }
}

// Patterns
void pattern1() {
  int lowSpeed = 50;
  int pulseDuration = 200;

  analogWrite(pwmPin, pwmValue);
  delay(pulseDuration);
  analogWrite(pwmPin, lowSpeed);
  delay(pulseDuration);
}

void pattern2() {
  for (int i = 50; i <= pwmValue; i += 5) {
    analogWrite(pwmPin, i);
    delay(50);
  }
  for (int i = pwmValue; i >= 50; i -= 5) {
    analogWrite(pwmPin, i);
    delay(50);
  }
}

void pattern3() {
  int burstDuration = 100;

  analogWrite(pwmPin, pwmValue);
  delay(burstDuration);
  analogWrite(pwmPin, 0);
  delay(burstDuration);
}

void pattern4() {
  int speed = random(50, pwmValue + 1);
  int duration = random(100, 500);

  analogWrite(pwmPin, speed);
  delay(duration);
  analogWrite(pwmPin, 0);
  delay(duration);
}

void pattern5() {
  int lowSpeed = 50;
  int step = 10;
  for (int peakSpeed = 50; peakSpeed <= pwmValue; peakSpeed += step) {
    analogWrite(pwmPin, peakSpeed);
    delay(200);
    analogWrite(pwmPin, lowSpeed);
    delay(200);
    checkSerial();
    if (!motorOn)
      return;
  }
}

// No Pattern # Default Mode
void noPattern() {
  digitalWrite(motorPin1, HIGH);
  digitalWrite(motorPin2, LOW);
  analogWrite(pwmPin, pwmValue);  // Write the PWM value to the motor
  digitalWrite(ledPin, HIGH);     // Turn on the LED
}

// Off all
void offAll() {
  analogWrite(pwmPin, 0);     // Turn off the motor
  digitalWrite(ledPin, LOW);  // Turn off the LED
}