import './About.css';

function About() {
  return (
    <div className="about">
        <div className = "about__picture"></div>
        <div className = "about__container">
        <h3 className = "about__header">About the author</h3>
        <div className = "about__text"><p>Veronika is an experienced web developer. She completed multiple web projects for a consulting company Sparq.</p>
       <p>Veronika is passionate about Javascript, React, React Native, Node and web development in general. Please see more <a href="https://veronikabowersock.vercel.app/" target="_blank"
                rel="noreferrer"> here</a> </p></div>
        </div>
        
    </div>
  );
}

export default About;
