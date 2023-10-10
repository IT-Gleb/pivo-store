import { PDFViewer } from "@react-pdf/renderer";
import PdfOrder from "./pdfOrder";
import { TOrderItem } from "../../store/slices/currOrderSlice";

function PdfView({
  paramNumOrder,
  paramNameClient,
  paramDateOrder,
  paramTotalPrice,
  paramOrderItems,
}: {
  paramNumOrder: string;
  paramNameClient: string;
  paramDateOrder: string;
  paramTotalPrice: string;
  paramOrderItems: TOrderItem[];
}) {
  return (
    <section className="section m-0 p-0 has-text-centered">
      <PDFViewer style={{ width: "92%", height: "80vh" }}>
        <PdfOrder
          paramNumOrder={paramNumOrder}
          paramNameClient={paramNameClient}
          paramDateOrder={paramDateOrder}
          paramTotalPrice={paramTotalPrice}
          paramOrderItems={paramOrderItems}
        />
      </PDFViewer>
    </section>
  );
}

export default PdfView;
