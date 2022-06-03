import styled from '@emotion/styled';
import { COLORS } from 'styles/theme';

const FlexWrapper = styled.div`
  display: flex;
  margin: ${(props) => props.margin || '0 auto'};
  padding: ${(props) => props.padding || '0'};
  flex-direction: ${(props) => props.flexDirection || 'row'};
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || 'unset'};
  align-items: ${(props) => props.alignItems || 'center'};
  justify-content: ${(props) => props.justifyContent};
  border: ${(props) => props.border};
`;

const Container = styled.div`
  display: flex;
  margin: ${(props) => props.margin || '0 0 2rem 0'};
  padding: ${(props) => props.padding || '0'};
  flex-direction: ${(props) => props.flexDirection || 'row'};
  width: ${(props) => props.width || '50%'};
  height: ${(props) => props.height || 'unset'};
  align-items: ${(props) => props.alignItems || 'flex-start'};
  justify-content: ${(props) => props.justifyContent || 'unset'};
  border: ${(props) => props.border};
`;

const HR = styled.hr`
  width: 100%;
  border: ${(props) => props.size || '2px'} solid ${(props) => props.color || COLORS.GRAY_300};
  margin: ${(props) => props.margin || '1rem 0'};
`;

const PageTitle = styled.h1`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 1rem;
  margin: 0 auto;
  color: ${(props) => props.color || COLORS.BLACK};
`;

const Text = styled.p`
  margin: ${(props) => props.margin || '0'};
  padding: ${(props) => props.padding || '0'};
  font-size: ${(props) => props.size || '1rem'};
  font-weight: ${(props) => props.weight || 'normal'};
`;

export { FlexWrapper, Container, HR, PageTitle, Text };
