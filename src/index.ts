import { InputData, jsonInputForTargetLanguage, quicktype } from "quicktype-core";
import { CustomDartTargetLanguage } from "./custom_dart_renderer";
//import { DartTargetLanguage } from "./quick_type_dart";

async function quicktypeJSON(className: string, jsonString: string) {
  const jsonInput = jsonInputForTargetLanguage("dart");
  await jsonInput.addSource({
    name: className,
    samples: [jsonString],
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  const lang = new CustomDartTargetLanguage();

  return await quicktype({
    lang,
    inputData,
  });
}

export async function runQuickType(className: string, jsonString: string): Promise<string> {
  //const jsonString = await fs.readFileSync("dart-json.json", "utf8");
  const { lines: result } = await quicktypeJSON(className, jsonString);
  //fs.writeFileSync("output.dart", result.join("\n"));
  return result.join("\n");
}
