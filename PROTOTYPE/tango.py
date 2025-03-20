def display(grid):
    l=len(grid)
    for i in range(l):
        if i%6==0:
            print()
        print(grid[i],end=" ")

def check_row(idx):
    r=get_row(idx)

def check_col(idx):
    c=get_col(idx)

def get_row(idx):
    return []

def get_col(col):
    return []



def solver(grid,equal,cross,idx):
    if grid[i]!=0:
        for i in range(1,3):
            grid[idx]=i
            if idx in equal:
                for i in equal[idx]:
                    grid[i]=grid[idx]
            if idx in cross:
                for i in cross[idx]:
                    grid[i]=1 if grid[idx]==2 else 1
            if check_row(idx) and check_col(idx):
                solver(grid,equal,cross,idx+1)
            else:
                if idx in equal:
                    for i in equal[idx]:
                        grid[i]=0
                if idx in cross:
                    for i in cross[idx]:
                        grid[i]=0
        else:
            solver(grid,equal,cross,idx+1)


if __name__=="__main__":
    tango=[0,0,0,0,0,0,
            0,0,0,0,0,1,
            0,0,0,0,1,0,
            0,0,0,1,0,2,
            0,0,1,0,1,0,
            0,1,0,1,0,2]
    
    print(tango)
    display(tango)

    equal={1:[2,7],6:[7,12]}
    cross={}
    if solver(tango,equal,cross,0):
        print("found states")
    else:
        print("no solution found")