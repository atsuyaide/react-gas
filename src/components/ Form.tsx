import { Button, MenuItem, Stack, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

interface TzOption {
  value: string;
  label: string;
}
interface FormatOption {
  書式: string;
}
interface FormInput {
  tz: string;
  fmt: string;
}

const Form = () => {
  const { register, handleSubmit } = useForm<FormInput>(); // 使用したいメソッド等
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data);
    // google.script.run
    //   .withSuccessHandler((result: string) => {
    //     alert(`現在は${result}です.`);
    //   })
    //   .withFailureHandler((e: any) => {
    //     if (e instanceof Error) {
    //       alert("実行に失敗しました.");
    //     }
    //   })
    //   .getDateTimeNow("JST", "yyyy-MM-dd HH:mm:ss");
  };
  const TzOptions: TzOption[] = [
    { value: "JST", label: "JST" },
    { value: "UTC", label: "UTC" },
  ];
  const FormatOptions: FormatOption[] = [
    { 書式: "yyyy-mm-dd" },
    { 書式: "yyyy-mm-dd HH:MM:SS" },
  ];
  return (
    <>
      <Stack spacing={2}>
        <TextField select label="タイムゾーン" {...register("tz")}>
          {TzOptions.map((opt) => (
            <MenuItem value={opt.value}>{opt.label}</MenuItem>
          ))}
        </TextField>
        <TextField select required label="書式" {...register("fmt")}>
          {FormatOptions.map((opt) => (
            <MenuItem value={opt.書式}>{opt.書式}</MenuItem>
          ))}
        </TextField>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
        >
          時刻を表示
        </Button>
      </Stack>
    </>
  );
};

export default Form;
