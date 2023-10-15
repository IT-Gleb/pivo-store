import { View, Image } from "@react-pdf/renderer";
//import { Buffer } from "buffer";

function ImageFromString({ paramImage64 }: { paramImage64: string }) {
  //   if (paramImage64) {
  //     console.log(paramImage64);
  //   }
  //   const buf = Buffer.from(paramImage64);

  //console.log(paramImage64);
  //console.log(bbb);
  //const blobImage = new Blob([bbb]);
  function convert(): string {
    //const bbb = Buffer.from(paramImage64, "base64");
    //return bbb.toString();
    return paramImage64;
  }
  return (
    <View
      style={[
        {
          width: 240,
          height: 160,
          objectFit: "cover",
          objectPosition: "top center",
        },
      ]}
    >
      <Image
        //src={URL.createObjectURL(blobImage)}
        source={convert}
        //source={{ data: bbb, format: "jpg" }}
        cache={false}
        style={{ width: "100%", height: "100%" }}
      ></Image>
    </View>
  );
}

export default ImageFromString;
