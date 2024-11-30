import Text from "COMPONENTS/Text";

export default function Shows() {
  return (
    <>
      <Text>WHAT WOULD YOU LIKE TO DO</Text>

      <div className="SpaceS" />

      <Text
        animationConfig={{ delay: 0.3 }}
        isListElement
        style={{ marginLeft: "2rem" }}
      >
        <span className="UnderLine Alert">SEARCH</span>
      </Text>

      <div className="SpaceM" />

      <Text animationConfig={{ delay: 0.8 }} hideIndent>
        TYPE <span className="Alert UnderLine"> BACK </span> TO RETURN OR{" "}
        <span className="Alert UnderLine"> CANCEL </span> TO CANCEL.
      </Text>
    </>
  );
}
