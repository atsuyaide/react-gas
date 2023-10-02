import { yupResolver } from "@hookform/resolvers/yup";
import { Button, MenuItem, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

interface TzOption {
  value: string;
  label: string;
}
interface FmtOption {
  書式: string;
}
interface FormInput {
  tz: string;
  fmt: string;
}

const tzMockOptions: TzOption[] = [
  { value: "JST", label: "JST" },
  { value: "UTC", label: "UTC" },
];
const fmtMockOptions: FmtOption[] = [
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
  const [tzOptions, setTz] = useState<TzOption[]>(tzMockOptions);
  const [fmtOptions, setFmt] = useState<FmtOption[]>(fmtMockOptions);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
  });

  // 読み込み時にSSと接続して選択肢を設定する
  useEffect(() => {
    const fetchData = async () => {
      props.setLoading(true);

      try {
        const tzResult: TzOption[] = await new Promise((resolve, reject) => {
          google.script.run
            .withSuccessHandler(resolve)
            .withFailureHandler(reject)
            .getTzOptions();
        });
        setTz(tzResult);

        const fmtResult: FmtOption[] = await new Promise((resolve, reject) => {
          google.script.run
            .withSuccessHandler(resolve)
            .withFailureHandler(reject)
            .getFmtOptions();
        });
        setFmt(fmtResult);
      } catch (error) {
        if (error instanceof Error) {
          console.log(`失敗しました: ${error.message}`);
        }
      } finally {
        props.setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ボタン押下時
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    props.setLoading(true);
    console.log(data);

    try {
      const result: string = await new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler(resolve)
          .withFailureHandler(reject)
          .getDateTimeNow(data.tz, data.fmt);
      });

      alert(`現在は${result}です.`);
    } catch (error) {
      if (error instanceof Error) {
        console.log(`失敗しました: ${error.message}`);
        alert("実行に失敗しました.");
      }
    } finally {
      props.setLoading(false);
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
          {tzOptions.map((opt) => (
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
          {fmtOptions.map((opt) => (
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
