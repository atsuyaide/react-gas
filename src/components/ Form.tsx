import { yupResolver } from "@hookform/resolvers/yup";
import { Button, MenuItem, Stack, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

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

const TzOptions: TzOption[] = [
  { value: "JST", label: "JST" },
  { value: "UTC", label: "UTC" },
];
const FormatOptions: FormatOption[] = [
  { 書式: "yyyy-MM-dd" },
  { 書式: "yyyy-MM-dd HH:mm:SS" },
];
const schema = yup.object({
  tz: yup.string().required(), // 何も指定しなければデフォルトのエラー文が表示される.
  fmt: yup.string().required("必須項目です."), // エラー文を指定できる.
});

interface FormProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Form = (props: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    props.setLoading(true);
    console.log(data);
    try {
      google.script.run
        .withSuccessHandler((result: string) => {
          alert(`現在は${result}です.`);
          props.setLoading(false);
        })
        .withFailureHandler((e: any) => {
          if (e instanceof Error) {
            alert("実行に失敗しました.");
          }
          props.setLoading(false);
        })
        .getDateTimeNow(data.tz, data.fmt);
    } catch (error) {
      if (error instanceof Error) {
        console.log(`失敗しました: ${error.message}`);
      }
      setTimeout(() => {
        props.setLoading(false);
      }, 2000);
    }
  };
  return (
    <>
      <Stack spacing={2}>
        <TextField
          select
          required
          error={"tz" in errors}
          helperText={errors.tz?.message}
          label="タイムゾーン"
          {...register("tz")}
        >
          {TzOptions.map((opt) => (
            <MenuItem value={opt.value}>{opt.label}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          required
          error={"fmt" in errors}
          helperText={errors.fmt?.message}
          label="書式"
          {...register("fmt")}
        >
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
