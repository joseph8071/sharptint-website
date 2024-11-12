function PricingCard({ title, price, features }) {
    return (
      <div className="pricing-card">
        <h3>{title}</h3>
        <h2>${price}/month</h2>
        <ul>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <button>Select Plan</button>
      </div>
    );
  }
  
  export default PricingCard;