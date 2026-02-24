import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaDownload, FaHome, FaPrint, FaCheckCircle } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./Bill.css";

export default function Bill() {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const billRef = useRef(null);

  useEffect(() => {
    const data = localStorage.getItem("latestOrder");
    if (!data) {
      navigate("/");
      return;
    }
    setOrder(JSON.parse(data));
  }, [navigate]);

  const downloadPDF = async () => {
    if (!billRef.current) return;

    const actionButtons = document.querySelector(".bill-actions");
    if (actionButtons) actionButtons.style.display = "none";

    try {
      const canvas = await html2canvas(billRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = 210;
      const pdfHeight = 297;

      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(`Invoice_${order.orderId}.pdf`);
    } catch (err) {
      console.error("PDF Error:", err);
    } finally {
      if (actionButtons) actionButtons.style.display = "flex";
    }
  };

  if (!order) return null;

  return (
    <div className="bill-container-modern">
      <div className="bill-card-premium" ref={billRef}>
        <div className="success-banner">
          <FaCheckCircle />
          <span>Payment Successful</span>
        </div>

        <header className="bill-top">
          <div>
            <h2 className="brand-logo">INVOICE<span>.</span></h2>
            <p className="order-tag">Invoice #{order.orderId}</p>
          </div>
          <div className="date-side">
            <label>Date</label>
            <p>{order.orderDate}</p>
          </div>
        </header>

        <section className="bill-client-info">
          <div className="info-column">
            <label>Billed To</label>
            <h3>{order.customer.fullName}</h3>
            <p>{order.customer.email}</p>
            <p>{order.customer.phone}</p>
          </div>

          <div className="info-column">
            <label>Shipping Address</label>
            <p>{order.customer.address}</p>
          </div>
        </section>

        <div className="bill-table-header">
          <span>Description</span>
          <span>Amount</span>
        </div>

        <section className="items-container">
          {order.items.map((item, index) => (
            <div className="item-row-luxury" key={`${item.id}-${index}`}>
              <div>
                <p className="item-name">{item.name}</p>
                <p className="item-qty">Qty: {item.cartQty}</p>
              </div>
              <p className="item-total">
                ₹{(item.price * item.cartQty).toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </section>

        <footer className="bill-final-calc">
          <div className="calc-row">
            <span>Delivery</span>
            <span className="free-text">FREE</span>
          </div>

          <div className="calc-row total-highlight">
            <span>Total Paid</span>
            <h2>₹{order.totalAmount.toLocaleString("en-IN")}</h2>
          </div>
        </footer>

        <div className="bill-actions">
          <button className="action-btn download" onClick={downloadPDF}>
            <FaDownload /> Download
          </button>
          <button className="action-btn print" onClick={() => window.print()}>
            <FaPrint /> Print
          </button>
          <button className="action-btn home" onClick={() => navigate("/")}>
            <FaHome /> Exit
          </button>
        </div>
      </div>
    </div>
  );
}
