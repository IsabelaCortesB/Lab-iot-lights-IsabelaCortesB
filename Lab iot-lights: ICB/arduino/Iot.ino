int LED1 = 12;
int LED2 = 13;

int lightSensor = A0;

int lightValue;
// int lightThreshold = 1023;

bool led1Status = false;
bool led2Status = false;


void setup() {
  // put your setup code here, to run once:
  pinMode(LED1, OUTPUT);
  digitalWrite(LED1, LOW);
  digitalWrite(LED2, LOW);
  pinMode(LED2, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if(Serial.available() > 0){
    receivingData();
  } else {
    sendingData();
  }
  delay(10);
}

void receivingData(){
  char status = Serial.read();

  switch(status){
    case 'A':
      digitalWrite(LED1, HIGH);
      led1Status = true;

    break;

    case 'B':
      digitalWrite(LED2, HIGH);
      led2Status = true;
    break;

    case 'S':
      digitalWrite(LED1, LOW);
      led1Status = false;

    break;

    case 'N':
      digitalWrite(LED2, LOW);
      led2Status = false;

    break;
  }

  Serial.flush();
}

void sendingData(){
  if (led1Status) {
Serial.print("Led 1 is on");
Serial.print("-");
} else if(!led1Status){
Serial.print("Led 1 is off");
Serial.print("-");
}

if (led2Status) {
Serial.print("Led 2 is on");
Serial.print("-");
} else if(!led2Status){
Serial.print("Led 2 is off");
Serial.print("-");
}
  lightValue = analogRead(lightSensor);

  if(lightValue < 70){
    Serial.print("light is Low");
    Serial.print("-");
  };

    if(lightValue > 200){
    Serial.print("light is High");
    Serial.print("-");
  };

      if(lightValue > 70 && lightValue < 200){
    Serial.print("light is Normal");
    Serial.print("-");
  };

Serial.println();
}
