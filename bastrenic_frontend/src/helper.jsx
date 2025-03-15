// Helper Functions
import styled from "styled-components";


export const formInputStyle = {
  '& label.Mui-focused': {
    color: '#6f4e7d'
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#6f4e7d'
  },
  width: '70%'
}

export const loginRegisterFormStyle = (
  styled.form`
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 350px;
    align-items: center;
    @media (max-width: 445px) {
      width: 100%;
    }
  `
)
