package com.codestars.ticketing.service;

import com.codestars.ticketing.model.Event;
import com.codestars.ticketing.model.Ticket;
import com.codestars.ticketing.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.time.format.DateTimeFormatter;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendTicketConfirmation(Ticket ticket, User user) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(user.getEmail());
        helper.setSubject("Ticket Confirmation - " + ticket.getEvent().getName());
        helper.setText(buildEmailTemplate(ticket, user, ticket.getEvent()), true);

        mailSender.send(message);
    }

    private String buildEmailTemplate(Ticket ticket, User user, Event event) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEEE, MMMM dd, yyyy 'at' hh:mm a");
        String formattedDate = event.getEventDate().format(formatter);
        
        return "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "<style>" +
                "body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }" +
                ".container { max-width: 600px; margin: 0 auto; padding: 20px; }" +
                ".header { background-color: #0d6efd; color: white; padding: 20px; text-align: center; }" +
                ".content { background-color: #f8f9fa; padding: 20px; margin: 20px 0; }" +
                ".ticket-code { background-color: #fff; border: 2px dashed #0d6efd; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; margin: 20px 0; }" +
                ".details { background-color: #fff; padding: 15px; margin: 10px 0; }" +
                ".details-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #dee2e6; }" +
                ".label { font-weight: bold; }" +
                ".footer { text-align: center; color: #6c757d; font-size: 12px; margin-top: 20px; }" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<div class='container'>" +
                "<div class='header'>" +
                "<h1>Ticket Confirmation</h1>" +
                "</div>" +
                "<div class='content'>" +
                "<p>Dear " + user.getName() + ",</p>" +
                "<p>Thank you for your purchase! Your ticket has been confirmed.</p>" +
                "<div class='ticket-code'>" +
                ticket.getTicketCode() +
                "</div>" +
                "<div class='details'>" +
                "<h3>Event Details</h3>" +
                "<div class='details-row'>" +
                "<span class='label'>Event:</span>" +
                "<span>" + event.getName() + "</span>" +
                "</div>" +
                "<div class='details-row'>" +
                "<span class='label'>Location:</span>" +
                "<span>" + event.getLocation() + "</span>" +
                "</div>" +
                "<div class='details-row'>" +
                "<span class='label'>Date & Time:</span>" +
                "<span>" + formattedDate + "</span>" +
                "</div>" +
                "<div class='details-row'>" +
                "<span class='label'>Category:</span>" +
                "<span>" + event.getCategory() + "</span>" +
                "</div>" +
                "</div>" +
                "<div class='details'>" +
                "<h3>Ticket Information</h3>" +
                "<div class='details-row'>" +
                "<span class='label'>Quantity:</span>" +
                "<span>" + ticket.getQuantity() + " ticket(s)</span>" +
                "</div>" +
                "<div class='details-row'>" +
                "<span class='label'>Total Paid:</span>" +
                "<span>KES " + String.format("%,.2f", ticket.getTotalPrice()) + "</span>" +
                "</div>" +
                "<div class='details-row'>" +
                "<span class='label'>Status:</span>" +
                "<span>" + ticket.getStatus() + "</span>" +
                "</div>" +
                "</div>" +
                "<div style='background-color: #d1ecf1; border-left: 4px solid #0c5460; padding: 15px; margin: 20px 0;'>" +
                "<h4 style='margin-top: 0; color: #0c5460;'>Important Instructions</h4>" +
                "<ul style='margin: 0; padding-left: 20px;'>" +
                "<li>Present this ticket code at the event entrance</li>" +
                "<li>Please arrive 30 minutes before the event starts</li>" +
                "<li>This ticket is non-refundable and non-transferable</li>" +
                "<li>Keep this email for your records</li>" +
                "</ul>" +
                "</div>" +
                "<p>We look forward to seeing you at the event!</p>" +
                "</div>" +
                "<div class='footer'>" +
                "<p>2025 Event Ticketing Kenya</p>" +
                "<p>This is an automated email. Please do not reply.</p>" +
                "</div>" +
                "</div>" +
                "</body>" +
                "</html>";
    }
}
