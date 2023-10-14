import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import PdfOrder from "./pdfOrder";
import { TOrderItem } from "../../store/slices/currOrderSlice";

function PdfView({
  paramNumOrder,
  paramNameClient,
  paramClientEmail,
  paramDateOrder,
  paramTotalPrice,
  paramOrderItems,
  paramImage64,
}: {
  paramNumOrder: string;
  paramNameClient: string;
  paramClientEmail: string;
  paramDateOrder: string;
  paramTotalPrice: string;
  paramOrderItems: TOrderItem[];
  paramImage64: string;
}) {
  return (
    <section className="section m-0 p-0 has-text-centered">
      <PDFViewer style={{ width: "92%", height: "80vh" }}>
        <PdfOrder
          paramNumOrder={paramNumOrder}
          paramNameClient={paramNameClient}
          paramClientEmail={paramClientEmail}
          paramDateOrder={paramDateOrder}
          paramTotalPrice={paramTotalPrice}
          paramOrderItems={paramOrderItems}
          paramImage64={paramImage64}
        />
      </PDFViewer>
    </section>
  );
}

export default React.memo(PdfView);
