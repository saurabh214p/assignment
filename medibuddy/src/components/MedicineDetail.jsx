import { formatOpenFda } from '../utils/formatters'

function renderClinicalSection(title, data) {
  if (!data) {
    return null
  }

  const paragraphs = Array.isArray(data) ? data : [String(data)]
  if (paragraphs.length === 0) {
    return null
  }

  return (
    <div className="clinical-box">
      <h4>{title}</h4>
      {paragraphs.map((p, index) => (
        <p key={index}>{p}</p>
      ))}
    </div>
  )
}

function MedicineDetail({ medicine, loading, error, onBack }) {
  if (loading) {
    return (
      <div>
        <a href="#/" className="back-btn" onClick={onBack}>
          &larr; Back to Search Results
        </a>
        <div className="status-message loading-box">
          Loading medicine details, please wait...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <a href="#/" className="back-btn" onClick={onBack}>
          &larr; Back to Search Results
        </a>
        <div className="status-message error-box">{error}</div>
        <a href="#/" className="back-btn" onClick={onBack}>
          Return to Search
        </a>
      </div>
    )
  }

  if (!medicine) {
    return null
  }

  const openfda = medicine.openfda || {}

  return (
    <div>
      <a href="#/" className="back-btn" onClick={onBack}>
        &larr; Back to Search Results
      </a>

      <div className="detail-header">
        <h2>{formatOpenFda(openfda.brand_name)}</h2>
        <p>Generic Name: {formatOpenFda(openfda.generic_name)}</p>
      </div>

      <div className="detail-section-title">OpenFDA Information</div>
      <table className="info-table">
        <tbody>
          <tr>
            <th>Brand Name</th>
            <td>{formatOpenFda(openfda.brand_name)}</td>
          </tr>
          <tr>
            <th>Generic Name</th>
            <td>{formatOpenFda(openfda.generic_name)}</td>
          </tr>
          <tr>
            <th>Manufacturer</th>
            <td>{formatOpenFda(openfda.manufacturer_name)}</td>
          </tr>
          <tr>
            <th>Product Type</th>
            <td>{formatOpenFda(openfda.product_type)}</td>
          </tr>
          <tr>
            <th>Route</th>
            <td>{formatOpenFda(openfda.route)}</td>
          </tr>
          <tr>
            <th>Substance Name</th>
            <td>{formatOpenFda(openfda.substance_name)}</td>
          </tr>
          <tr>
            <th>Application Number</th>
            <td>{formatOpenFda(openfda.application_number)}</td>
          </tr>
          <tr>
            <th>Product NDC</th>
            <td>{formatOpenFda(openfda.product_ndc)}</td>
          </tr>
          <tr>
            <th>Package NDC</th>
            <td>{formatOpenFda(openfda.package_ndc)}</td>
          </tr>
          <tr>
            <th>Pharm Class (EPC)</th>
            <td>{formatOpenFda(openfda.pharm_class_epc)}</td>
          </tr>
          <tr>
            <th>Pharm Class (CS)</th>
            <td>{formatOpenFda(openfda.pharm_class_cs)}</td>
          </tr>
          <tr>
            <th>Pharm Class (MoA)</th>
            <td>{formatOpenFda(openfda.pharm_class_moa)}</td>
          </tr>
          <tr>
            <th>SPL ID</th>
            <td>{formatOpenFda(openfda.spl_id)}</td>
          </tr>
          <tr>
            <th>RxCUI</th>
            <td>{formatOpenFda(openfda.rxcui)}</td>
          </tr>
          <tr>
            <th>UNII</th>
            <td>{formatOpenFda(openfda.unii)}</td>
          </tr>
        </tbody>
      </table>

      <div className="detail-section-title">Clinical & Label Details</div>

      {renderClinicalSection('Purpose', medicine.purpose)}
      {renderClinicalSection('Indications and Usage', medicine.indications_and_usage)}
      {renderClinicalSection('Active Ingredient', medicine.active_ingredient)}
      {renderClinicalSection('Dosage and Administration', medicine.dosage_and_administration)}
      {renderClinicalSection('Warnings', medicine.warnings || medicine.warnings_and_cautions)}
      {renderClinicalSection('Do Not Use', medicine.do_not_use)}
      {renderClinicalSection('Ask Doctor / Pharmacist', medicine.ask_doctor || medicine.ask_doctor_or_pharmacist)}
      {renderClinicalSection('Stop Use', medicine.stop_use)}
      {renderClinicalSection('Inactive Ingredient', medicine.inactive_ingredient)}
      {renderClinicalSection('Storage and Handling', medicine.storage_and_handling || medicine.storage_and_handling_information)}
      {renderClinicalSection('Keep Out of Reach of Children', medicine.keep_out_of_reach_of_children)}

      <a href="#/" className="back-btn bottom-back" onClick={onBack}>
        &larr; Back to Search Results
      </a>
    </div>
  )
}

export default MedicineDetail
