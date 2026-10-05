import { formatOpenFda } from '../utils/formatters'

function MedicineCard({ item, onSelect }) {
  const openfda = item.openfda || {}

  return (
    <a
      href={`#/medicine/${item.id}`}
      className="medicine-card"
      onClick={() => onSelect(item)}
    >
      <h3 className="card-title">
        {formatOpenFda(openfda.brand_name)}
      </h3>
      <div className="card-field">
        <strong>Generic Name:</strong> {formatOpenFda(openfda.generic_name)}
      </div>
      <div className="card-field">
        <strong>Manufacturer:</strong> {formatOpenFda(openfda.manufacturer_name)}
      </div>
      <div className="card-field">
        <strong>Product Type:</strong> {formatOpenFda(openfda.product_type)}
      </div>
      <div className="card-field">
        <strong>Route:</strong> {formatOpenFda(openfda.route)}
      </div>
      <div className="card-field">
        <strong>Substance Name:</strong> {formatOpenFda(openfda.substance_name)}
      </div>
      <div className="card-view-btn">
        View Full Details &rarr;
      </div>
    </a>
  )
}

export default MedicineCard
