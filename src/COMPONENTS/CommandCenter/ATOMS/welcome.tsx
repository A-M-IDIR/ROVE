import WithHideInput from "RESOURCES/HOCS/WithHideInput";
import Text from "COMPONENTS/Text";

export default function Welcome() {
  return (
    <WithHideInput duration={4.1} key={"WELCOME_COMMAND"}>
      <Text>
        WELCOME T0 [ ROVE ] 0.0.1 - your go-to entertainment terminal !.
      </Text>

      <div className="SpaceS" />

      <Text animationConfig={{ delay: 1 }}>
        We don't <span className="Alert">HOST</span>,{" "}
        <span className="Alert"> SAVE</span>, or{" "}
        <span className="Alert"> STREAM </span> a thing—that's all the web! We
        just connect the dots and point you to the best links. So, for all the
        data, you know who to thank (or blame) <span>{"(• ᴗ <)"}</span>
      </Text>

      <div className="SpaceM" />

      <Text animationConfig={{ delay: 3.2 }}>
        ENTER ONE OF THE FOLLOWING COMMANDS TO GET STARTED
      </Text>

      <div className="SpaceS" />

      <Text
        animationConfig={{ delay: 3.8 }}
        isListElement
        style={{ marginLeft: "2rem" }}
      >
        <span className="UnderLine Alert">MOVIES</span>
      </Text>

      <div className="SpaceS" />

      <Text
        animationConfig={{ delay: 4 }}
        isListElement
        style={{ marginLeft: "2rem" }}
      >
        <span className="UnderLine Alert">SHOWS</span>
      </Text>

      <div className="SpaceG" />
    </WithHideInput>
  );
}
