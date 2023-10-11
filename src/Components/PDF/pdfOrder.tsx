import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { type TOrderItem } from "../../store/slices/currOrderSlice";
import Pechat1 from "../../assets/imgs/pechat_1.png";

import MyRobotoFont from "../../assets/fonts/roboto/Roboto-Regular.ttf";
import MyRobotoFontBold from "../../assets/fonts/roboto/Roboto-Bold.ttf";
import MyRobotoFontLight from "../../assets/fonts/roboto/Roboto-Light.ttf";

import MyFiraSans from "../../assets/fonts/Fira_Sans/FiraSans-Light.ttf";
import MyFiraSansThin from "../../assets/fonts/Fira_Sans/FiraSans-Thin.ttf";
import MyFiraSansBold from "../../assets/fonts/Fira_Sans/FiraSans-Bold.ttf";
import MyFiraSansNormal from "../../assets/fonts/Fira_Sans/FiraSans-Regular.ttf";
import { randomFrom } from "../../libs";

Font.register({
  family: "myRoboto",
  src: MyRobotoFont,
  format: "truetype",
  fontStyle: "normal",
  fontWeight: "normal",
  fonts: [
    { src: MyRobotoFontBold, fontWeight: "bold" },
    { src: MyRobotoFontLight, fontWeight: "light" },
  ],
});
Font.register({
  family: "myFiraSuns",
  src: MyFiraSansNormal,
  format: "truetype",
  fontStyle: "normal",
  fontWeight: "normal",
  fonts: [
    { src: MyFiraSansBold, fontWeight: "bold" },
    { src: MyFiraSansThin, fontWeight: "thin" },
    { src: MyFiraSans, fontWeight: "light" },
  ],
});

const tdthWidth: number[] = [40, 210, 65];

const pdfStyles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    columnGap: 30,
    rowGap: 10,
    flexGrow: 1,
    paddingHorizontal: 25,
    marginVertical: 35,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    width: "100%",
    padding: 2,
    marginVertical: 2,
  },
  section_50: {
    width: "50%",
    paddingHorizontal: 4,
  },
  sectionFull: {
    width: "100%",
    paddingHorizontal: 20,
  },
  sectionFullWithMarginTop: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 35,
  },
  sectionFullWithMarginTop20: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  textCenter: {
    textAlign: "center",
    fontFamily: "myRoboto",
    paddingHorizontal: 20,
  },
  smalltext: {
    padding: 0,
    paddingBottom: 2,
    fontFamily: "myFiraSuns",
    fontSize: 8,
    fontWeight: "normal",
    textAlign: "justify",
  },
  smallBoldtext: {
    padding: 0,
    paddingBottom: 2,
    fontFamily: "myFiraSuns",
    fontSize: 9,
    fontWeight: "bold",
  },
  smallBlueBoldtext: {
    padding: 0,
    fontFamily: "myFiraSuns",
    fontSize: 10,
    fontWeight: "light",
    color: "darkblue",
  },
  mediumBlueBoldtext: {
    padding: 0,
    fontFamily: "myFiraSuns",
    fontSize: 16,
    fontWeight: "bold",
    color: "darkblue",
  },
  titleBig: {
    padding: 6,
    fontFamily: "myRoboto",
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  title2: {
    padding: 6,
    fontFamily: "myRoboto",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  tableRow: {
    flexDirection: "row",
    textAlign: "center",
    margin: "0 auto",
  },
  TH1: {
    fontFamily: "myRoboto",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "lightblue",
    padding: 6,
    textTransform: "uppercase",
    overflow: "hidden",
    textOverflow: "ellipsis",
    border: "1px solid lightgrey",
    borderBottom: "1px solid darkgrey",
    marginHorizontal: 0.5,
    marginVertical: 0.5,
    width: tdthWidth[0],
  },
  TH2: {
    fontFamily: "myRoboto",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "lightblue",
    padding: 6,
    textTransform: "uppercase",
    overflow: "hidden",
    textOverflow: "ellipsis",
    border: "1px solid lightgrey",
    borderBottom: "1px solid darkgrey",
    marginHorizontal: 0.5,
    marginVertical: 0.5,
    width: tdthWidth[1],
  },
  TH3: {
    fontFamily: "myRoboto",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    backgroundColor: "lightblue",
    padding: 6,
    textTransform: "uppercase",
    border: "1px solid lightgrey",
    borderBottom: "1px solid darkgrey",
    marginHorizontal: 0.5,
    marginVertical: 0.5,
    width: tdthWidth[2],
  },

  TD1: {
    fontFamily: "myFiraSuns",
    fontSize: 10,
    fontWeight: "light",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: 6,
    marginHorizontal: 0.5,
    marginVertical: 0.5,
    width: tdthWidth[0],
    borderBottom: "1px solid darkgrey",
    backgroundColor: "white",
  },
  TD2: {
    fontFamily: "myFiraSuns",
    fontSize: 11,
    textAlign: "left",
    fontWeight: "light",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: 6,
    marginHorizontal: 0.5,
    marginVertical: 0.5,
    width: tdthWidth[1],
    borderBottom: "1px solid darkgrey",
    backgroundColor: "white",
  },
  TD3: {
    fontFamily: "myFiraSuns",
    fontSize: 10,
    fontWeight: "light",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: 6,
    marginHorizontal: 0.5,
    marginVertical: 0.5,
    width: tdthWidth[2],
    borderBottom: "1px solid darkgrey",
    backgroundColor: "white",
  },
  TDnull1: {
    width: tdthWidth[0],
    padding: 6,
  },
  TDnull2: {
    width: tdthWidth[1],
    padding: 6,
  },
  TDnull3: {
    fontFamily: "myRoboto",
    fontSize: 16,
    fontWeight: "light",
    width: tdthWidth[2],
    padding: 6,
  },
  TDItog: {
    width: tdthWidth[tdthWidth.length - 1] + tdthWidth[tdthWidth.length - 1],
    fontFamily: "myRoboto",
    fontSize: 18,
    fontWeight: "light",
    color: "darkblue",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: 6,
  },
  imageSt: {
    width: 110,
    height: 108,
    position: "absolute",
    bottom: "4%",
    left: `${randomFrom(7, 15)}%`,
    transform: `rotate(${8 + randomFrom(-60, 60)}deg)`,
  },
});

const PdfOrder = ({
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
}) => {
  return (
    <Document author="IT-Gleb">
      <Page size="A4" style={pdfStyles.page} wrap={true}>
        <View style={pdfStyles.row}>
          <View style={pdfStyles.section_50}>
            <Text style={pdfStyles.title2}>
              <Text style={pdfStyles.textCenter}>ООО "Рога и копыта"</Text>
            </Text>
            <Text style={pdfStyles.smalltext}>
              <Text style={pdfStyles.smallBlueBoldtext}>Индекс: </Text>{" "}
              00016289.
            </Text>
            <Text style={pdfStyles.smalltext}>
              <Text style={pdfStyles.smallBlueBoldtext}>Адрес: </Text>
              г.Москва ул. 3-я Строителей, строение 5/12.
            </Text>
            <Text style={pdfStyles.smalltext}>
              <Text style={pdfStyles.smallBlueBoldtext}>Телефон: </Text>
              +7800800000.
            </Text>
            <Text style={pdfStyles.smalltext}>
              <Text style={pdfStyles.smallBlueBoldtext}>E-mail: </Text>
              roga&cops@mail.ru
            </Text>
            <Text style={pdfStyles.smalltext}>
              <Text style={pdfStyles.smallBlueBoldtext}>
                Генеральный директор:{"     "}
              </Text>
              <Text style={pdfStyles.smallBoldtext}>Бендер О. И. </Text>
            </Text>
            <Text style={pdfStyles.smalltext}>
              <Text style={pdfStyles.smallBlueBoldtext}>
                Гл. бухгалтер:{"     "}
              </Text>
              <Text style={pdfStyles.smallBoldtext}>Несчитайло Н. А. </Text>
            </Text>
          </View>
          <View style={pdfStyles.section_50}>
            <Text style={pdfStyles.titleBig}>
              <Text style={pdfStyles.textCenter}>заказ </Text>
              <Text style={pdfStyles.mediumBlueBoldtext}>{paramNumOrder}</Text>
            </Text>
            <Text style={pdfStyles.smalltext}>
              <Text style={pdfStyles.smallBlueBoldtext}>Заказчик: </Text>
              <Text style={pdfStyles.smallBoldtext}> {paramNameClient} </Text>
            </Text>
            <Text>
              <Text style={pdfStyles.smallBlueBoldtext}>Дата заказа: </Text>
              <Text style={pdfStyles.smallBoldtext}> {paramDateOrder} </Text>
            </Text>
          </View>
        </View>
        <View style={pdfStyles.row}>
          <View style={pdfStyles.sectionFullWithMarginTop}>
            <Text style={pdfStyles.textCenter}>
              Позиции заказа {paramNumOrder}
            </Text>
          </View>
        </View>
        <View style={pdfStyles.row}>
          <View style={pdfStyles.sectionFullWithMarginTop20}>
            <View style={pdfStyles.tableRow}>
              <Text style={pdfStyles.TH1}>№/№</Text>
              <Text style={pdfStyles.TH2}>Позиция</Text>
              <Text style={pdfStyles.TH3}>Кол-во</Text>
              <Text style={pdfStyles.TH3}>Ед. измер</Text>
              <Text style={pdfStyles.TH3}>Цена за ед.</Text>
              <Text style={pdfStyles.TH3}>Сумма позиции</Text>
            </View>
            {paramOrderItems &&
              paramOrderItems.length > 0 &&
              paramOrderItems.map((item, ind) => {
                return (
                  <View
                    key={item.id}
                    style={pdfStyles.tableRow}
                    break={ind >= 15 ? true : false}
                    wrap={ind >= 15 ? true : false}
                  >
                    <Text style={pdfStyles.TD1}>{ind + 1}.</Text>
                    <Text style={pdfStyles.TD2}>{item.name}</Text>
                    <Text style={pdfStyles.TD3}>{item.count}</Text>
                    <Text style={pdfStyles.TD3}>шт.</Text>
                    <Text style={pdfStyles.TD3}>{item.priceOne}.00&#8381;</Text>
                    <Text style={pdfStyles.TD3}>{item.price}.00&#8381;</Text>
                  </View>
                );
              })}
            <View style={pdfStyles.tableRow}>
              <Text style={pdfStyles.TDnull1}></Text>
              <Text style={pdfStyles.TDnull2}></Text>
              <Text style={pdfStyles.TDnull3}></Text>
              <Text style={pdfStyles.TDnull3}></Text>
              <Text style={pdfStyles.TDnull3}></Text>
              <Text style={pdfStyles.TDnull3}></Text>
            </View>
            <View style={pdfStyles.tableRow}>
              <Text style={pdfStyles.TDnull1}></Text>
              <Text style={pdfStyles.TDnull2}></Text>
              <Text style={pdfStyles.TDnull3}></Text>
              <Text style={pdfStyles.TDnull3}>Итог:</Text>
              {paramTotalPrice && (
                <Text style={pdfStyles.TDItog}>
                  {paramTotalPrice}.00&#8381;
                </Text>
              )}
            </View>
          </View>
        </View>
        <View style={pdfStyles.row}>
          {/* <View style={pdfStyles.sectionFullWithMarginTop}></View> */}
        </View>

        <View style={pdfStyles.row}>
          <View style={pdfStyles.sectionFullWithMarginTop}>
            <Image style={pdfStyles.imageSt} src={Pechat1}></Image>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default React.memo(PdfOrder);
