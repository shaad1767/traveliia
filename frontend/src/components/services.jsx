import React from "react";
import "./services.css";

const servicesList = [
  { name: "Photography", img: "https://img.icons8.com/emoji/96/camera-emoji.png" },
  { name: "Chef", img: "https://img.icons8.com/emoji/96/cooking-emoji.png" },
  { name: "Gym", img: "https://img.icons8.com/emoji/96/muscle-emoji.png" },
  { name: "Massage", img: "https://img.icons8.com/emoji/96/massage-emoji.png" },
  { name: "Makeup", img: "https://img.icons8.com/emoji/96/makeup-emoji.png" },
  { name: "Hair", img: "https://img.icons8.com/emoji/96/haircut-emoji.png" },
  { name: "Hair", img: "https://img.icons8.com/emoji/96/haircut-emoji.png" },
  { name: "Hair", img: "https://img.icons8.com/emoji/96/haircut-emoji.png" },

];

const mealsList = [
  { name: "Pasta Alfredo", img: "https://img.icons8.com/emoji/96/spaghetti-emoji.png" },
  { name: "Grilled Salmon", img: "https://img.icons8.com/emoji/96/fish-emoji.png" },
  { name: "Caesar Salad", img: "https://img.icons8.com/emoji/96/green-salad-emoji.png" },
  { name: "Steak", img: "https://img.icons8.com/emoji/96/cut-of-meat-emoji.png" },
  { name: "Sushi Platter", img: "https://img.icons8.com/emoji/96/sushi-emoji.png" },
  { name: "Chocolate Cake", img: "https://img.icons8.com/emoji/96/birthday-cake-emoji.png" },
  { name: "Fruit Bowl", img: "https://img.icons8.com/emoji/96/fruit-emoji.png" },
  { name: "Steak", img: "https://img.icons8.com/emoji/96/cut-of-meat-emoji.png" },

];

const shoppingList = [
  { name: "Backpack", img: "https://img.icons8.com/emoji/96/backpack-emoji.png" },
  { name: "Camera Lens", img: "https://img.icons8.com/emoji/96/camera-lens-emoji.png" },
  { name: "Sports Shoes", img: "https://img.icons8.com/emoji/96/running-shoe-emoji.png" },
  { name: "Headphones", img: "https://img.icons8.com/emoji/96/headphone-emoji.png" },
  { name: "Sunglasses", img: "https://img.icons8.com/emoji/96/sunglasses-emoji.png" },
    { name: "Backpack", img: "https://img.icons8.com/emoji/96/backpack-emoji.png" },
  { name: "Camera Lens", img: "https://img.icons8.com/emoji/96/camera-lens-emoji.png" },
  { name: "Sports Shoes", img: "https://img.icons8.com/emoji/96/running-shoe-emoji.png" },
];

const Services = () => {
  return (
    <section className="services-section">
      <h2 className="section-title">Our Offerings</h2>
      <p className="section-subtitle">Services, Meals & Online Shopping in one place</p>

      {/* Services Section */}
      <div className="section-row">
        <h3 className="column-title">Services</h3>
        <div className="row-container">
          {servicesList.map((service, i) => (
            <div key={i} className="service-card">
              <img src={service.img} alt={service.name} />
              <h3>{service.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Meals Section */}
      <div className="section-row">
        <h3 className="column-title">Meals</h3>
        <div className="row-container">
          {mealsList.map((meal, i) => (
            <div key={i} className="meal-card">
              <img src={meal.img} alt={meal.name} />
              <p>{meal.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Online Shopping Section */}
      <div className="section-row">
        <h3 className="column-title">Online Shopping</h3>
        <div className="row-container">
          {shoppingList.map((item, i) => (
            <div key={i} className="item-card">
              <img src={item.img} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;