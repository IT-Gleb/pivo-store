import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfOrder from "./pdfOrder";
import { type TOrderItem } from "../../store/slices/currOrderSlice";

function Pdf_Invoice({
  filename,
  paramNumOrder,
  paramNameClient,
  paramClientEmail,
  paramDateOrder,
  paramTotalPrice,
  paramOrderItems,
}: {
  filename: string;
  paramNumOrder: string;
  paramNameClient: string;
  paramClientEmail: string;
  paramDateOrder: string;
  paramTotalPrice: string;
  paramOrderItems: TOrderItem[];
}) {
  return (
    <button className="button is-small is-primary">
      <PDFDownloadLink
        document={
          <PdfOrder
            paramNumOrder={paramNumOrder}
            paramNameClient={paramNameClient}
            paramClientEmail={paramClientEmail}
            paramDateOrder={paramDateOrder}
            paramTotalPrice={paramTotalPrice}
            paramOrderItems={paramOrderItems}
          />
        }
        fileName={filename}
        style={{ color: "hsl(155, 35%, 90%)", padding: "0.5rem 1.25rem" }}
      >
        {({ blob, url, loading, error }) => (loading ? "..." : "Скачать")}
      </PDFDownloadLink>
    </button>
  );
}

export default React.memo(Pdf_Invoice);
