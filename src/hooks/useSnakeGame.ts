import { useState, useEffect, useCallback, useRef } from 'react';

type Point = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const GRID_SIZE = 20;
const INITIAL_SPEED = 120;

const getRandomFoodPosition = (snake: Point[]): Point => {
  let newFood: Point = { x: 0, y: 0 };
  let isValid = false;
  while (!isValid) {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    if (!snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
      isValid = true;
    }
  }
  return newFood;
};

export const useSnakeGame = () => {
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState<Direction>('UP');
  const [food, setFood] = useState<Point>({ x: 10, y: 5 });
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const directionRef = useRef<Direction>(direction);
  const isGameOverRef = useRef(isGameOver);
  const isPausedRef = useRef(isPaused);
  const foodRef = useRef<Point>(food);
  
  useEffect(() => { directionRef.current = direction; }, [direction]);
  useEffect(() => { isGameOverRef.current = isGameOver; }, [isGameOver]);
  useEffect(() => { isPausedRef.current = isPaused; }, [isPaused]);
  useEffect(() => { foodRef.current = food; }, [food]);

  const resetGame = useCallback(() => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection('UP');
    directionRef.current = 'UP';
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    
    const newFood = getRandomFoodPosition([{ x: 10, y: 10 }]);
    setFood(newFood);
    foodRef.current = newFood;
  }, []);

  const moveSnake = useCallback(() => {
    if (isGameOverRef.current || isPausedRef.current) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = { ...head };

      switch (directionRef.current) {
        case 'UP': newHead.y -= 1; break;
        case 'DOWN': newHead.y += 1; break;
        case 'LEFT': newHead.x -= 1; break;
        case 'RIGHT': newHead.x += 1; break;
      }

      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        setIsGameOver(true);
        return prevSnake;
      }

      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];
      const currentFood = foodRef.current;

      if (newHead.x === currentFood.x && newHead.y === currentFood.y) {
        setScore(s => s + 10);
        setFood(getRandomFoodPosition(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight", " "].includes(e.key)) {
          e.preventDefault();
      }
      
      if (e.key === ' ' && isGameOverRef.current) {
        resetGame();
        return;
      }
      
      if (e.key === ' ') {
        setIsPaused(p => !p);
        return;
      }
      
      if (isPausedRef.current || isGameOverRef.current) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (directionRef.current !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (directionRef.current !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (directionRef.current !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (directionRef.current !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [resetGame]);

  useEffect(() => {
    const interval = setInterval(moveSnake, INITIAL_SPEED);
    return () => clearInterval(interval);
  }, [moveSnake]);

  return { snake, food, direction, score, isGameOver, isPaused, resetGame, GRID_SIZE };
};
