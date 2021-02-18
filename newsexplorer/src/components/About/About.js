import './About.css';

function About() {
  return (
    <div className="about">
        <div className = "about__picture"></div>
        <div className = "about__container">
        <h3 className = "about__header">About the author</h3>
        <div className = "about__text"><p>This block describes the project author. 
        Here you should indicate your name, what you do, and which development technologies you know.</p>
       <p>You can also talk about your experience with Practicum, what you learned there, 
        and how you can help potential customers.</p></div>
        </div>
        
    </div>
  );
}

export default About;