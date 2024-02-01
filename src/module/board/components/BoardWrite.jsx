import { useResetRecoilState } from "recoil"
import { writeAtom } from "../recoil/board-atom"
import { useForm } from "react-hook-form";
import { useBoardCreateMutation } from "../service/mutation/boardCreateMutation";
import { useEffect } from "react";
import { Backdrop, IconButton, Paper, Portal, Stack, TextField, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Button } from "@mui/base";

export default function BoardWrite() {

  const resetWriteState = useResetRecoilState(writeAtom);
  const onCloseWrite = () => {
    resetWriteState();
  };

  const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onBlur'}); // register에 대한 mode 입니다. validate를 언제 적용할껀지 :: onChange | onBlur | onSubmit | onTouched | all
  const {mutate: saveBoard} = useBoardCreateMutation({
    onSuccess: () => {
      onCloseWrite();
    }
  })

  const save = (data) => {
    console.log(data);

    const board = {
      ...data,
      isRead: false,
      regDate: Date.now()
    }

    saveBoard(board);
  };

  const onKeydown = (e) => {
    if (e.key === 'Escape') {
      onCloseWrite();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  });

  return (
    <Portal>
      <Backdrop open sx={{zIndex: 1289}}/>
      <Paper sx={{
        position: "fixed",
        display: "flex",
        overflow: "hidden",
        flexDirection: "column",
        borderRadius: 2,
        zIndex: 1290,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        height: 400,
      }}>
        <Stack sx={{flex: 1, overflow: "hidden"}}>
          {/* header */}
          <Stack direction="row" sx={{p: 2, backgroundColor: "#cecece"}}>
            <Typography variant="h6" sx={{flexGrow: 1}}>
              Article Write
            </Typography>
            <IconButton onClick={onCloseWrite}>
              <Close/>
            </IconButton>
          </Stack>

          {/* contents */}
          <Stack sx={{flex: 1, overflow: "auto", gap: 2, p: 2}}>
            <TextField label="title"
              fullWidth
              {...register("title", {
                required: "제목은 필수 입력입니다.",
                minLength: {
                  value: "3",
                  message: "제목이 너무 짧아요"
                },
                maxLength: {
                  value: "10",
                  message: "제목이 너무 길어요"
                },
              })}
              error={!!errors.title} helperText={!!errors.title && errors.title.message}/>
            
            <TextField label="contents"
              fullWidth
              multiline
              rows={4}
              {...register("contents",{
                maxLength: {
                  value: 10,
                  message: "본문이 너무 길어요"
                }
              })}
              error={!!errors.contents} helperText={!!errors.contents && errors.contents.message}/>
          </Stack>

          {/* footer */}
          <Stack direction="row"
            sx={{
              p: 2,
              alignItems: "center",
              justifyContent: "center"
            }}>
            <Button variant="contained"
              onClick={handleSubmit(save)}
              sx={{width: 89}}>
              등록
            </Button>
          </Stack>
        </Stack>

      </Paper>
    </Portal>
  )
}