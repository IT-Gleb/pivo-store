import { View, Image } from "@react-pdf/renderer";

function ImageFromString({ paramImage64 }: { paramImage64: string }) {
  return (
    <View
      style={[
        {
          width: 160,
          height: 160,
          objectFit: "cover",
          objectPosition: "top center",
          margin: "0 auto",
        },
      ]}
    >
      <Image
        //src={URL.createObjectURL(blobImage)}
        src={paramImage64}
        // source={paramImage64}
        //source={{ data: bbb, format: "jpg" }}
        cache={false}
        style={{ width: "100%", height: "100%" }}
      ></Image>
    </View>
  );
}

export default ImageFromString;
