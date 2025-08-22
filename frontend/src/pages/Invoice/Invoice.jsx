import React, { useRef, useEffect,useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from '../../assets/logo/logo2.png';
import signature from '../../assets/signature/signature.jpeg';

function Invoice({ customer, items, orderId, date, total, grandTotal, API_URL }) {
  const { fullname, email, country, province, district, sector, cell, village, street, phonenumber } = customer;

  const invoiceRef = useRef();

  const downloadPDF = () => {
    const input = invoiceRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`invoice-${orderId}.pdf`);
    });
  };
//   useEffect(() => {
//     downloadPDF();
//   }, []);
  return (
    <div>
      {/* Download button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={downloadPDF}
          style={{ backgroundColor: '#0077be', color: '#ffffff' , padding:'5px 10px'}}
          className="px-4 py-2 rounded-lg shadow-md hover:brightness-90"
        >
          Download Invoices
        </button>
      </div>

            <div ref={invoiceRef} style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        {/* -----------------heading------------- */}
        <div style={{ backgroundColor: '#333134', clipPath: 'ellipse(100% 100% at 50% 100%)' }} className="flex justify-evenly">
          <div>
            <img src={logo} alt="logo" className='w-[12rem]' />
          </div>
          <div className="flex items-center justify-center gap-5" style={{ color: '#fffbeb' }}>
            <div>
              <p className='font-semibold' style={{ color: '#0077be' }}>Phone:</p>
              <p>+250 787 845 162</p>
              <p>+250 722 245 279</p>
            </div>
            <div>
              <p className='font-semibold' style={{ color: '#0077be' }}>Web:</p>
              <p>semana@gmail.com</p>
              <p>parfait@gmail.com</p>
            </div>
            <div>
              <p className='font-semibold' style={{ color: '#0077be' }}>Area:</p>
              <p>kigali - rwanda</p>
              <p>kk 567 st</p>
            </div>
          </div>
        </div>

        {/* ---------------user informations--------------- */}
        <div className='flex items-center justify-around'>
          <div>
            <p>To:</p>
            <h2>{fullname}</h2>
            <p><span className='font-semibold'>Phone:</span> {phonenumber}</p>
            <p><span className='font-semibold'>Email:</span> {email}</p><br />
            <div className='flex gap-5'>
              <div>
                <p><span className='font-semibold'>Country:</span> {country}</p>
                <p><span className='font-semibold'>Province:</span> {province}</p>
                <p><span className='font-semibold'>District:</span> {district}</p>
              </div>
              <div>
                <p><span className='font-semibold'>Sector:</span> {sector}</p>
                <p><span className='font-semibold'>Cell:</span> {cell}</p>
                <p><span className='font-semibold'>Village:</span> {village}</p>
                <p><span className='font-semibold'>Street:</span> {street}</p>
              </div>
            </div>
          </div>
          <div>
            <h1 className='font-bold text-6xl'>INVOICE</h1><br />
            <p><span className='font-semibold'>Invoice No: </span> 2025-{orderId}-S1E2M3A3N5A</p>
            <p><span className='font-semibold'>Account No: </span> +250 787 845 162</p>
            <p><span className='font-semibold'>Date: </span> {date}</p>
          </div>
        </div><br />

        {/* ------------------table----------------- */}
        <div className="overflow-x-auto px-4">
          <table style={{ width: '100%', textAlign: 'center', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ backgroundColor: '#0077be', height: '3.5rem', padding: '0.5rem' }}>ITEM DESCRIPTION</th>
                <th style={{ backgroundColor: '#fcd34d', padding: '0.5rem' }}>PRICE</th>
                <th style={{ backgroundColor: '#fcd34d', padding: '0.5rem' }}>QTY</th>
                <th style={{ backgroundColor: '#fcd34d', padding: '0.5rem' }}>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className='flex gap-2' style={{ padding: '0.5rem', textAlign: 'left' }}>
                    <img src={item.product_image1 ? `${API_URL}/uploads/${item.product_image1}` : logo} alt={item.product_name} className='w-[5rem]' />
                    <div>
                      <h1 className='font-bold'>{item.product_name}</h1>
                      <p>{item.product_description}</p>
                    </div>
                  </td>
                  <td>{Number(item.product_newprice).toLocaleString()} RWF</td>
                  <td>{item.quantity}</td>
                  <td>{(Number(item.product_newprice) * Number(item.quantity)).toLocaleString()} RWF</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-start justify-between w-full">
          <div style={{ padding: '10px 50px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h1 className='font-bold'>PAYMENT INFO:</h1>
            <p><span className='font-bold'>MTN RWANDA:</span> +250 787 8451 62</p>
            <p>We accept Cheque</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className='flex items-center justify-between'>
              <h1 className='font-bold text-[20px]'>TOTAL: </h1>
              <h1 className='font-bold text-[20px]'>{total.toLocaleString()}</h1>
            </div>
            <div className='flex items-center justify-between' style={{ backgroundColor: '#fbbf24', height: '3.5rem', padding: '1px 7px' }}>
              <h1 className='font-bold text-[20px]'>GRAND TOTAL:</h1>
              <h1 className='font-bold text-[20px]'>{grandTotal.toLocaleString()}</h1>
            </div>
          </div>
        </div>

        {/* -----------------footing------------ */}
        <div className='flex items-center justify-evenly'>
          <div>
            <h1 className='font-bold text-2xl'>We truly appreciate your trust in us!</h1>
            <p className='font-bold'>Terms & Conditions:</p>
            <p>Payments should be made in the agreed currency and within the specified time frame.</p>
          </div>
          <div>
            <h1 className='font-bold'>SEMANA SHEMA Parfait</h1>
            <p>CEO / Owner</p>
            <img src={signature} className='w-[15rem]' />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Invoice;
