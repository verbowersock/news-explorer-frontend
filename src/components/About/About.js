import './About.css';

function About() {
  return (
    <div className="about">
        <div className = "about__picture"></div>
        <div className = "about__container">
        <h3 className = "about__header">About the author</h3>
        <div className = "about__text"><p>Veronika is an aspiring web developer. 
        She completed Practicum by Yandex program in March 2021.</p>
       <p>Veronika has experience in Quality Assurance and believes it can help in her future web development career.</p></div>
        </div>
        
    </div>
  );
}

export default About;