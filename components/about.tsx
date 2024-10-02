import React from 'react';
import Image from 'next/image';
import image1 from "@/Images/pics/Healthy meal.png";
import image2 from "@/Images/pics/Workout session.png";
import image3 from "@/Images/pics/CommunitySupport.png";
import image4 from "@/Images/pics/motivational quote.png";
import image5 from "@/Images/pics/fitnesscommmunity.png";
import image6 from "@/Images/pics/HealthyLifestyle.png";

function Profile() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome to FitnessLeague</h1>
      <p className="text-lg mb-4 text-center max-w-xl">
        At FitnessLeague, we believe in empowering individuals to sculpt their bodies 
        and embrace a healthier lifestyle. Join our community of fitness enthusiasts 
        dedicated to achieving their wellness goals through a balanced diet and effective workouts.
      </p>
      
      <div className="flex flex-wrap justify-center mb-4">
        { [image1, image2, image3].map((img, index) => (
          <div key={index} className="w-52 h-36 rounded-lg overflow-hidden m-2 transition-transform transform hover:scale-105">
            <Image src={img} alt={`Image ${index + 1}`} width={200} height={150} layout="responsive" />
          </div>
        ))}
      </div>
      
      <p className="text-lg mb-4 text-center max-w-xl">
        Our platform offers a wealth of resources, including tailored meal plans and workout 
        routines, ensuring you have everything you need to succeed on your fitness journey.
      </p>
      
      <div className="flex flex-wrap justify-center mb-4">
        { [image4, image5, image6].map((img, index) => (
          <div key={index} className="w-52 h-36 rounded-lg overflow-hidden m-2 transition-transform transform hover:scale-105">
            <Image src={img} alt={`Image ${index + 4}`} width={200} height={150} layout="responsive" />
          </div>
        ))}
      </div>
      
      <p className="text-lg mb-6 text-center max-w-xl">
        Subscribe now for just <strong>0.001 Ether</strong> and unlock exclusive access 
        to premium content, personal coaching, and a supportive community that celebrates 
        every milestone.
      </p>
      
      <div className="text-2xl mb-6 text-center animate-pulse">
        <span className="font-bold text-white transition-colors duration-300 hover:text-gray-500">💪 Happy Muscles! 💪</span>
      </div>
    </div>
  );
}

export default Profile;
