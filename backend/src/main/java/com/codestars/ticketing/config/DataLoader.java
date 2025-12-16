package com.codestars.ticketing.config;

import com.codestars.ticketing.model.Event;
import com.codestars.ticketing.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final EventRepository eventRepository;

    @Autowired
    public DataLoader(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        eventRepository.deleteAll();

        List<Event> events = new ArrayList<>();

        events.add(new Event("Sauti Sol Live in Concert", "Kenya's award-winning afro-pop band performs their greatest hits live at Kasarani Stadium.", "Kasarani Stadium, Nairobi", LocalDateTime.of(2026, 1, 15, 19, 0), 3000.0, 15000, "Concert", "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3"));
        events.add(new Event("Nairobi Tech Summit 2026", "East Africa's largest technology conference featuring AI, blockchain, and fintech innovations.", "KICC, Nairobi", LocalDateTime.of(2026, 1, 20, 9, 0), 2500.0, 2000, "Technology", "https://images.unsplash.com/photo-1540575467063-178a50c2df87"));
        events.add(new Event("Nyashinski Concert", "The legendary Kenyan rapper returns with a spectacular performance of his hit songs.", "Carnivore Grounds, Nairobi", LocalDateTime.of(2026, 2, 5, 18, 0), 2500.0, 8000, "Concert", "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"));
        events.add(new Event("Mombasa Beach Festival", "Annual coastal celebration with live music, water sports, and cultural performances.", "Diani Beach, Mombasa", LocalDateTime.of(2026, 2, 14, 10, 0), 1500.0, 5000, "Festival", "https://images.unsplash.com/photo-1519046904884-53103b34b206"));
        events.add(new Event("Startup Grind Nairobi", "Monthly meetup for entrepreneurs featuring successful founders and investors.", "iHub, Nairobi", LocalDateTime.of(2026, 2, 25, 18, 30), 1000.0, 300, "Technology", "https://images.unsplash.com/photo-1556761175-5973dc0f32e7"));
        
        events.add(new Event("Bien-Aimé Solo Concert", "Former Sauti Sol member performs his solo hits in an intimate acoustic session.", "Alliance Française, Nairobi", LocalDateTime.of(2026, 3, 10, 19, 30), 2000.0, 1500, "Concert", "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"));
        events.add(new Event("Kisumu Jazz Festival", "Three-day jazz festival featuring local and international artists by Lake Victoria.", "Lake Victoria Waterfront, Kisumu", LocalDateTime.of(2026, 3, 20, 17, 0), 1800.0, 3000, "Music", "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f"));
        events.add(new Event("Kenya Blockchain Summit", "Exploring cryptocurrency, NFTs, and blockchain applications in East Africa.", "Radisson Blu, Nairobi", LocalDateTime.of(2026, 3, 28, 9, 0), 3500.0, 800, "Technology", "https://images.unsplash.com/photo-1639762681485-074b7f938ba0"));
        events.add(new Event("Nviiri The Storyteller Live", "The soulful singer-songwriter performs his emotional ballads and storytelling music.", "Uhuru Gardens, Nairobi", LocalDateTime.of(2026, 4, 5, 18, 0), 1500.0, 5000, "Concert", "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7"));
        events.add(new Event("Nairobi Marathon", "Annual marathon through the streets of Nairobi supporting local charities.", "Uhuru Park, Nairobi", LocalDateTime.of(2026, 4, 12, 6, 0), 2000.0, 10000, "Sports", "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3"));
        
        events.add(new Event("Khaligraph Jones Concert", "The OG performs his rap anthems in a high-energy show.", "Carnivore Grounds, Nairobi", LocalDateTime.of(2026, 4, 25, 19, 0), 2200.0, 7000, "Concert", "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3"));
        events.add(new Event("DevFest Nairobi 2026", "Google Developer Groups annual conference on web, mobile, and cloud technologies.", "Strathmore University, Nairobi", LocalDateTime.of(2026, 5, 8, 9, 0), 1500.0, 1500, "Technology", "https://images.unsplash.com/photo-1540575467063-178a50c2df87"));
        events.add(new Event("Otile Brown Live", "The RnB sensation performs his romantic hits and latest releases.", "Kenyatta Stadium, Machakos", LocalDateTime.of(2026, 5, 15, 18, 30), 1800.0, 6000, "Concert", "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"));
        events.add(new Event("Eldoret Agricultural Expo", "Showcasing Kenya's agricultural innovations and farming technologies.", "Eldoret Showground, Eldoret", LocalDateTime.of(2026, 5, 22, 8, 0), 800.0, 8000, "Exhibition", "https://images.unsplash.com/photo-1574943320219-553eb213f72d"));
        events.add(new Event("AI & Machine Learning Conference", "Deep dive into artificial intelligence applications for African markets.", "Villa Rosa Kempinski, Nairobi", LocalDateTime.of(2026, 6, 3, 9, 0), 4000.0, 600, "Technology", "https://images.unsplash.com/photo-1677442136019-21780ecad995"));
        
        events.add(new Event("Nadia Mukami Concert", "The afro-pop queen performs her chart-topping hits.", "Ngong Racecourse, Nairobi", LocalDateTime.of(2026, 6, 12, 17, 0), 1500.0, 8000, "Concert", "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"));
        events.add(new Event("Nakuru Comedy Night", "Top Kenyan comedians including Eric Omondi and Churchill perform live.", "Nakuru Athletic Club, Nakuru", LocalDateTime.of(2026, 6, 20, 19, 0), 1200.0, 2000, "Entertainment", "https://images.unsplash.com/photo-1585699324551-f6c309eedeca"));
        events.add(new Event("Cyber Security Summit Kenya", "Addressing digital security challenges and solutions for businesses.", "Sarova Panafric, Nairobi", LocalDateTime.of(2026, 6, 28, 9, 0), 3000.0, 500, "Technology", "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"));
        events.add(new Event("Bahati Family Concert", "Bahati and Diana Marua perform together in a family-friendly show.", "Kasarani Stadium, Nairobi", LocalDateTime.of(2026, 7, 4, 16, 0), 2000.0, 12000, "Concert", "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7"));
        events.add(new Event("Thika Food & Wine Festival", "Culinary celebration featuring Kenya's best chefs and local wines.", "Blue Post Hotel, Thika", LocalDateTime.of(2026, 7, 10, 11, 0), 2500.0, 1500, "Food", "https://images.unsplash.com/photo-1555939594-58d7cb561ad1"));
        
        events.add(new Event("Octopizzo Live Performance", "The Kibera-born rapper performs his socially conscious hip-hop.", "Carnivore Grounds, Nairobi", LocalDateTime.of(2026, 7, 18, 19, 0), 1800.0, 5000, "Concert", "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3"));
        events.add(new Event("Mobile App Development Workshop", "Hands-on workshop on Flutter and React Native development.", "Moringa School, Nairobi", LocalDateTime.of(2026, 7, 25, 9, 0), 2000.0, 200, "Technology", "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c"));
        events.add(new Event("Machakos Cultural Festival", "Celebrating Kamba culture with traditional music, dance, and crafts.", "Machakos People's Park, Machakos", LocalDateTime.of(2026, 8, 1, 10, 0), 1000.0, 4000, "Cultural", "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3"));
        events.add(new Event("Willy Paul Gospel Concert", "Contemporary gospel music performance by Pozze.", "Nyayo Stadium, Nairobi", LocalDateTime.of(2026, 8, 8, 15, 0), 1500.0, 10000, "Concert", "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"));
        events.add(new Event("FinTech Innovation Summit", "Exploring mobile money, digital banking, and payment solutions.", "Serena Hotel, Nairobi", LocalDateTime.of(2026, 8, 15, 9, 0), 3500.0, 700, "Technology", "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f"));
        
        events.add(new Event("Nameless & Wahu Concert", "Kenya's power couple performs their classic hits together.", "Uhuru Gardens, Nairobi", LocalDateTime.of(2026, 8, 22, 18, 0), 2500.0, 8000, "Concert", "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"));
        events.add(new Event("Mombasa Carnival", "Week-long coastal carnival with parades, music, and cultural displays.", "Mombasa City Center, Mombasa", LocalDateTime.of(2026, 8, 28, 10, 0), 1200.0, 15000, "Festival", "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3"));
        events.add(new Event("Cloud Computing Conference", "AWS, Azure, and Google Cloud strategies for African businesses.", "Crowne Plaza, Nairobi", LocalDateTime.of(2026, 9, 5, 9, 0), 2800.0, 600, "Technology", "https://images.unsplash.com/photo-1451187580459-43490279c0fa"));
        events.add(new Event("Akothee Live in Concert", "The self-proclaimed president of single mothers performs her hits.", "Kasarani Stadium, Nairobi", LocalDateTime.of(2026, 9, 12, 17, 0), 2000.0, 10000, "Concert", "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7"));
        events.add(new Event("Nairobi Fashion Week", "Showcasing East African fashion designers and emerging trends.", "Sarit Centre, Nairobi", LocalDateTime.of(2026, 9, 19, 18, 0), 3000.0, 1000, "Fashion", "https://images.unsplash.com/photo-1469334031218-e382a71b716b"));
        
        events.add(new Event("Arrow Bwoy Concert", "The dancehall artist performs his energetic hits.", "Carnivore Grounds, Nairobi", LocalDateTime.of(2026, 9, 26, 19, 0), 1800.0, 6000, "Concert", "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3"));
        events.add(new Event("Data Science Bootcamp", "Intensive training on Python, R, and machine learning for data analysis.", "Nairobi Garage, Nairobi", LocalDateTime.of(2026, 10, 3, 9, 0), 5000.0, 100, "Technology", "https://images.unsplash.com/photo-1551288049-bebda4e38f71"));
        events.add(new Event("Kisumu Music Festival", "Three-day music festival featuring Luo benga and contemporary artists.", "Jomo Kenyatta Sports Ground, Kisumu", LocalDateTime.of(2026, 10, 10, 14, 0), 1500.0, 7000, "Music", "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3"));
        events.add(new Event("Sailors Gang Live", "The gengetone crew performs their viral hits.", "Ngong Racecourse, Nairobi", LocalDateTime.of(2026, 10, 17, 18, 0), 1500.0, 8000, "Concert", "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"));
        events.add(new Event("IoT & Smart Cities Summit", "Internet of Things applications for urban development in Kenya.", "Radisson Blu, Nairobi", LocalDateTime.of(2026, 10, 24, 9, 0), 3200.0, 500, "Technology", "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f"));
        
        events.add(new Event("Ethic Entertainment Concert", "The controversial gengetone group performs their street anthems.", "Carnivore Grounds, Nairobi", LocalDateTime.of(2026, 10, 31, 19, 0), 1800.0, 7000, "Concert", "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3"));
        events.add(new Event("Nairobi International Trade Fair", "Annual trade exhibition showcasing products from across East Africa.", "ASK Showground, Nairobi", LocalDateTime.of(2026, 11, 5, 9, 0), 500.0, 20000, "Exhibition", "https://images.unsplash.com/photo-1540575467063-178a50c2df87"));
        events.add(new Event("Victoria Kimani Concert", "The international star performs her afrobeat and RnB hits.", "Alliance Française, Nairobi", LocalDateTime.of(2026, 11, 12, 19, 30), 2500.0, 1200, "Concert", "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"));
        events.add(new Event("E-Commerce Summit Kenya", "Strategies for online retail success in the African market.", "Villa Rosa Kempinski, Nairobi", LocalDateTime.of(2026, 11, 19, 9, 0), 3000.0, 600, "Technology", "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"));
        events.add(new Event("Nyashinski Unplugged", "Intimate acoustic performance of Nyashinski's greatest hits.", "Kenya National Theatre, Nairobi", LocalDateTime.of(2026, 11, 26, 19, 0), 3000.0, 800, "Concert", "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7"));
        
        events.add(new Event("Mombasa Tech Conference", "Coastal Kenya's premier technology and innovation summit.", "Serena Beach Resort, Mombasa", LocalDateTime.of(2026, 12, 3, 9, 0), 2500.0, 800, "Technology", "https://images.unsplash.com/photo-1540575467063-178a50c2df87"));
        events.add(new Event("Femi One Live", "The female rapper performs her empowering hip-hop tracks.", "Ngong Racecourse, Nairobi", LocalDateTime.of(2026, 12, 10, 18, 0), 1500.0, 5000, "Concert", "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"));
        events.add(new Event("Nairobi Christmas Carols", "Annual Christmas celebration with choirs and gospel artists.", "Uhuru Park, Nairobi", LocalDateTime.of(2026, 12, 20, 16, 0), 500.0, 15000, "Music", "https://images.unsplash.com/photo-1482517967863-00e15c9b44be"));
        events.add(new Event("New Year's Eve Gala", "Ring in 2027 with live performances by top Kenyan artists.", "KICC Rooftop, Nairobi", LocalDateTime.of(2026, 12, 31, 20, 0), 5000.0, 2000, "Concert", "https://images.unsplash.com/photo-1467810563316-b5476525c0f9"));

        events.add(new Event("Rufftone Gospel Concert", "Contemporary gospel music celebration.", "Nyayo Stadium, Nairobi", LocalDateTime.of(2026, 1, 25, 15, 0), 1200.0, 8000, "Concert", "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"));
        events.add(new Event("Hackathon Nairobi 2026", "48-hour coding competition solving real-world problems.", "iHub, Nairobi", LocalDateTime.of(2026, 2, 15, 9, 0), 1000.0, 300, "Technology", "https://images.unsplash.com/photo-1504384308090-c894fdcc538d"));
        events.add(new Event("Eldoret Half Marathon", "Charity run through the home of champions.", "Eldoret Town, Eldoret", LocalDateTime.of(2026, 3, 5, 6, 30), 1500.0, 5000, "Sports", "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3"));
        events.add(new Event("Naiboi Live Performance", "The versatile artist performs his diverse musical catalog.", "Carnivore Grounds, Nairobi", LocalDateTime.of(2026, 3, 15, 19, 0), 1800.0, 6000, "Concert", "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3"));
        events.add(new Event("Women in Tech Summit", "Empowering female tech leaders and entrepreneurs.", "Radisson Blu, Nairobi", LocalDateTime.of(2026, 3, 25, 9, 0), 2000.0, 500, "Technology", "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6"));
        
        events.add(new Event("Mejja Concert", "The genge legend performs his classic and new hits.", "Ngong Racecourse, Nairobi", LocalDateTime.of(2026, 4, 8, 18, 0), 1500.0, 7000, "Concert", "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"));
        events.add(new Event("Kisumu Innovation Week", "Week-long celebration of innovation and entrepreneurship.", "Kisumu Polytechnic, Kisumu", LocalDateTime.of(2026, 4, 18, 9, 0), 800.0, 1000, "Technology", "https://images.unsplash.com/photo-1556761175-5973dc0f32e7"));
        events.add(new Event("Nakuru Agricultural Show", "Annual showcase of farming innovations and livestock.", "Nakuru Showground, Nakuru", LocalDateTime.of(2026, 5, 1, 8, 0), 600.0, 10000, "Exhibition", "https://images.unsplash.com/photo-1574943320219-553eb213f72d"));
        events.add(new Event("Daddy Owen Gospel Festival", "Gospel music celebration with multiple artists.", "Kasarani Stadium, Nairobi", LocalDateTime.of(2026, 5, 10, 14, 0), 1000.0, 12000, "Concert", "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"));
        events.add(new Event("UX/UI Design Conference", "Latest trends in user experience and interface design.", "Nairobi Garage, Nairobi", LocalDateTime.of(2026, 5, 20, 9, 0), 2500.0, 400, "Technology", "https://images.unsplash.com/photo-1561070791-2526d30994b5"));
        
        events.add(new Event("Redsan Live Concert", "The dancehall king performs his reggae and dancehall hits.", "Carnivore Grounds, Nairobi", LocalDateTime.of(2026, 6, 5, 19, 0), 2000.0, 7000, "Concert", "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3"));
        events.add(new Event("Mombasa Food Festival", "Coastal culinary celebration featuring Swahili cuisine.", "Fort Jesus, Mombasa", LocalDateTime.of(2026, 6, 15, 11, 0), 1500.0, 3000, "Food", "https://images.unsplash.com/photo-1555939594-58d7cb561ad1"));
        events.add(new Event("Blockchain for Business Workshop", "Practical applications of blockchain in African enterprises.", "Strathmore University, Nairobi", LocalDateTime.of(2026, 6, 25, 9, 0), 3000.0, 200, "Technology", "https://images.unsplash.com/photo-1639762681485-074b7f938ba0"));
        events.add(new Event("Kristoff Live Performance", "The RnB singer performs his smooth vocals.", "Alliance Française, Nairobi", LocalDateTime.of(2026, 7, 5, 19, 30), 1800.0, 1500, "Concert", "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"));
        events.add(new Event("Eldoret Tech Meetup", "Monthly gathering of developers and tech enthusiasts.", "Eldoret Sports Club, Eldoret", LocalDateTime.of(2026, 7, 15, 18, 0), 500.0, 200, "Technology", "https://images.unsplash.com/photo-1556761175-5973dc0f32e7"));
        
        events.add(new Event("Tanasha Donna Concert", "The songstress performs her latest hits.", "Ngong Racecourse, Nairobi", LocalDateTime.of(2026, 7, 25, 18, 0), 1500.0, 6000, "Concert", "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"));
        events.add(new Event("Nairobi Coffee Festival", "Celebrating Kenya's world-famous coffee culture.", "Karura Forest, Nairobi", LocalDateTime.of(2026, 8, 5, 10, 0), 1000.0, 5000, "Food", "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"));
        events.add(new Event("DevOps Summit Kenya", "CI/CD, containerization, and cloud-native development.", "Sarova Panafric, Nairobi", LocalDateTime.of(2026, 8, 12, 9, 0), 2800.0, 500, "Technology", "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb"));
        events.add(new Event("Jua Cali Live", "The genge pioneer performs his legendary tracks.", "Carnivore Grounds, Nairobi", LocalDateTime.of(2026, 8, 20, 19, 0), 1800.0, 7000, "Concert", "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3"));
        events.add(new Event("Kisumu Cultural Week", "Celebrating Luo culture with music, dance, and art.", "Kisumu Museum, Kisumu", LocalDateTime.of(2026, 8, 28, 10, 0), 800.0, 4000, "Cultural", "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3"));
        
        events.add(new Event("Size 8 Gospel Concert", "Contemporary gospel performance by Size 8 Reborn.", "Nyayo Stadium, Nairobi", LocalDateTime.of(2026, 9, 5, 15, 0), 1200.0, 10000, "Concert", "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"));
        events.add(new Event("Artificial Intelligence Workshop", "Hands-on AI and deep learning training.", "Moringa School, Nairobi", LocalDateTime.of(2026, 9, 15, 9, 0), 4000.0, 150, "Technology", "https://images.unsplash.com/photo-1677442136019-21780ecad995"));
        events.add(new Event("Nakuru Music Festival", "Multi-genre music festival in the Rift Valley.", "Nakuru Athletic Club, Nakuru", LocalDateTime.of(2026, 9, 22, 14, 0), 1500.0, 8000, "Music", "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3"));
        events.add(new Event("Trio Mio Concert", "The young rap sensation performs his viral hits.", "Ngong Racecourse, Nairobi", LocalDateTime.of(2026, 9, 29, 18, 0), 1500.0, 8000, "Concert", "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"));
        events.add(new Event("Mobile Money Innovation Summit", "M-Pesa and digital payment innovations.", "Serena Hotel, Nairobi", LocalDateTime.of(2026, 10, 5, 9, 0), 3000.0, 600, "Technology", "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f"));
        
        events.add(new Event("Prezzo Live Performance", "The rapper performs his comeback hits.", "Carnivore Grounds, Nairobi", LocalDateTime.of(2026, 10, 12, 19, 0), 1800.0, 6000, "Concert", "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3"));
        events.add(new Event("Mombasa Marathon", "Coastal marathon supporting marine conservation.", "Mombasa Waterfront, Mombasa", LocalDateTime.of(2026, 10, 20, 6, 0), 2000.0, 8000, "Sports", "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3"));
        events.add(new Event("Software Testing Conference", "QA automation and testing best practices.", "Crowne Plaza, Nairobi", LocalDateTime.of(2026, 10, 27, 9, 0), 2500.0, 400, "Technology", "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"));
        events.add(new Event("Jovial Concert", "The female artist performs her afro-pop hits.", "Alliance Française, Nairobi", LocalDateTime.of(2026, 11, 3, 19, 30), 1500.0, 1500, "Concert", "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"));
        events.add(new Event("Eldoret Innovation Summit", "Showcasing tech innovations from the Rift Valley.", "Moi University, Eldoret", LocalDateTime.of(2026, 11, 10, 9, 0), 1500.0, 800, "Technology", "https://images.unsplash.com/photo-1556761175-5973dc0f32e7"));
        
        events.add(new Event("Madtraxx Live Concert", "The veteran rapper performs his classic hits.", "Carnivore Grounds, Nairobi", LocalDateTime.of(2026, 11, 17, 19, 0), 1800.0, 6000, "Concert", "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3"));
        events.add(new Event("Nairobi Art Week", "Contemporary art exhibitions and installations.", "Nairobi National Museum, Nairobi", LocalDateTime.of(2026, 11, 24, 10, 0), 1000.0, 3000, "Art", "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b"));
        events.add(new Event("Cybersecurity Bootcamp", "Intensive ethical hacking and security training.", "Nairobi Garage, Nairobi", LocalDateTime.of(2026, 12, 1, 9, 0), 5000.0, 100, "Technology", "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"));
        events.add(new Event("Wyre Live Performance", "The dancehall artist performs his energetic tracks.", "Ngong Racecourse, Nairobi", LocalDateTime.of(2026, 12, 8, 18, 0), 1500.0, 6000, "Concert", "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"));
        events.add(new Event("Kisumu Tech Conference", "Western Kenya's technology and innovation summit.", "Imperial Hotel, Kisumu", LocalDateTime.of(2026, 12, 15, 9, 0), 2000.0, 600, "Technology", "https://images.unsplash.com/photo-1540575467063-178a50c2df87"));
        
        events.add(new Event("Breeder LW Concert", "The gengetone artist performs his street anthems.", "Carnivore Grounds, Nairobi", LocalDateTime.of(2026, 12, 22, 19, 0), 1500.0, 7000, "Concert", "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3"));
        events.add(new Event("Nairobi Wine Festival", "Tasting event featuring local and international wines.", "Karura Forest, Nairobi", LocalDateTime.of(2026, 1, 30, 12, 0), 3000.0, 1000, "Food", "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3"));
        events.add(new Event("React & Vue.js Workshop", "Modern JavaScript framework development.", "Moringa School, Nairobi", LocalDateTime.of(2026, 2, 20, 9, 0), 3000.0, 150, "Technology", "https://images.unsplash.com/photo-1633356122544-f134324a6cee"));
        events.add(new Event("Timmy Tdat Live", "The club banger king performs his party hits.", "Ngong Racecourse, Nairobi", LocalDateTime.of(2026, 3, 1, 18, 0), 1500.0, 7000, "Concert", "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"));
        events.add(new Event("Mombasa Cultural Festival", "Celebrating Swahili heritage and coastal traditions.", "Old Town, Mombasa", LocalDateTime.of(2026, 3, 12, 10, 0), 1000.0, 5000, "Cultural", "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3"));
        
        events.add(new Event("Agile & Scrum Masterclass", "Project management methodologies for tech teams.", "Villa Rosa Kempinski, Nairobi", LocalDateTime.of(2026, 4, 2, 9, 0), 3500.0, 200, "Technology", "https://images.unsplash.com/photo-1552664730-d307ca884978"));
        events.add(new Event("Kambua Gospel Concert", "Inspirational gospel music performance.", "Nyayo Stadium, Nairobi", LocalDateTime.of(2026, 4, 15, 15, 0), 1200.0, 10000, "Concert", "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"));
        events.add(new Event("Nakuru Half Marathon", "Charity run around Lake Nakuru.", "Nakuru Town, Nakuru", LocalDateTime.of(2026, 4, 22, 6, 30), 1500.0, 6000, "Sports", "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3"));
        events.add(new Event("Rekles Live Performance", "The gengetone star performs his viral hits.", "Carnivore Grounds, Nairobi", LocalDateTime.of(2026, 5, 5, 19, 0), 1500.0, 7000, "Concert", "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3"));
        events.add(new Event("Nairobi Startup Week", "Week-long celebration of entrepreneurship and innovation.", "iHub, Nairobi", LocalDateTime.of(2026, 5, 12, 9, 0), 1000.0, 1000, "Technology", "https://images.unsplash.com/photo-1556761175-5973dc0f32e7"));
        
        events.add(new Event("Kisumu Jazz Night", "Intimate jazz performance by Lake Victoria.", "Acacia Premier Hotel, Kisumu", LocalDateTime.of(2026, 6, 1, 19, 0), 2000.0, 500, "Music", "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f"));
        events.add(new Event("Python Programming Bootcamp", "Intensive Python development training.", "Nairobi Garage, Nairobi", LocalDateTime.of(2026, 6, 10, 9, 0), 4000.0, 150, "Technology", "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"));
        events.add(new Event("Stevo Simple Boy Concert", "The viral sensation performs his unique style.", "Ngong Racecourse, Nairobi", LocalDateTime.of(2026, 6, 18, 18, 0), 1000.0, 8000, "Concert", "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"));
        events.add(new Event("Eldoret Food Festival", "Celebrating Kalenjin cuisine and local delicacies.", "Eldoret Sports Club, Eldoret", LocalDateTime.of(2026, 6, 28, 11, 0), 1200.0, 3000, "Food", "https://images.unsplash.com/photo-1555939594-58d7cb561ad1"));
        events.add(new Event("Digital Marketing Summit", "SEO, social media, and content marketing strategies.", "Radisson Blu, Nairobi", LocalDateTime.of(2026, 7, 8, 9, 0), 2500.0, 500, "Technology", "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293"));

        eventRepository.saveAll(events);
        System.out.println("Database initialized with " + eventRepository.count() + " Kenyan events for 2026");
    }
}
