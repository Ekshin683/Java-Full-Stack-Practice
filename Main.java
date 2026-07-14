public class Main {
    static abstract class Message {
        String recipient;
        String content;

        public Message(String recipient, String content) {
            this.recipient = recipient;
            this.content = content;
        }
    }

    static class EmailMessage extends Message {
        String subject;

        public EmailMessage(String recipient, String subject, String content) {
            super(recipient, content);
            this.subject = subject;
        }
    }

    static class SMSMessage extends Message {
        public SMSMessage(String recipient, String content) {
            super(recipient, content);
        }
    }

    interface EmailSender {
        void sendEmail(EmailMessage message);
    }

    interface SmsSender {
        void sendSMS(SMSMessage message);
    }

    interface PushSender {
        void sendPush(String deviceId, String message);
    }

    static class EmailChannel implements EmailSender {

        @Override
        public void sendEmail(EmailMessage message) {
            System.out.println("EMAIL");
            System.out.println("To      : " + message.recipient);
            System.out.println("Subject : " + message.subject);
            System.out.println("Message : " + message.content);
        }
    }

    static class SMSChannel implements SmsSender {

        @Override
        public void sendSMS(SMSMessage message) {
            System.out.println("SMS");
            System.out.println("Phone   : " + message.recipient);
            System.out.println("Message : " + message.content);
        }
    }

    static class PushChannel implements PushSender {

        @Override
        public void sendPush(String deviceId, String message) {
            System.out.println("PUSH");
            System.out.println("Device  : " + deviceId);
            System.out.println("Message : " + message);
        }
    }

    static class NotificationService {

        private EmailSender emailSender;
        private SmsSender smsSender;
        private PushSender pushSender;

        public NotificationService(
                EmailSender emailSender,
                SmsSender smsSender,
                PushSender pushSender) {

            this.emailSender = emailSender;
            this.smsSender = smsSender;
            this.pushSender = pushSender;
        }

        public void sendEmail(EmailMessage message) {
            emailSender.sendEmail(message);
        }

        public void sendSMS(SMSMessage message) {
            smsSender.sendSMS(message);
        }

        public void sendPush(String deviceId, String message) {
            pushSender.sendPush(deviceId, message);
        }
    }

    public static void main(String[] args) {

        NotificationService service = new NotificationService(
                new EmailChannel(),
                new SMSChannel(),
                new PushChannel()
        );

        EmailMessage email = new EmailMessage(
                "john@gmail.com",
                "Welcome",
                "Welcome to our application!"
        );

        SMSMessage sms = new SMSMessage(
                "9876543210",
                "Your OTP is 123456"
        );

        service.sendEmail(email);
        System.out.println();

        service.sendSMS(sms);
        System.out.println();

        service.sendPush(
                "DEVICE-101",
                "You have a new notification."
        );
    }
}