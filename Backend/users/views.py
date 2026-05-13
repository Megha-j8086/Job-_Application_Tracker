from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from .serializers import UserSerializer


# ✅ REGISTER (PUBLIC)
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User created successfully"})

    return Response(serializer.errors, status=400)
    


# ✅ LOGIN (PUBLIC)
@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    email = request.data.get("email")
    password = request.data.get("password")

    user = User.objects.filter(email=email, password=password).first()

    if not user:
        return Response({"error": "Invalid credentials"}, status=401)

    refresh = RefreshToken.for_user(user)

    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "user": UserSerializer(user).data
    })


# ✅ PROTECTED EXAMPLE
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


# DELETE USER
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user(request, id):

    try:

        user = User.objects.get(id=id)

        user.delete()

        return Response({
            "message": "User Deleted"
        })

    except User.DoesNotExist:

        return Response({
            "error": "User not found"
        })


# UPDATE USER
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user(request, id):

    try:

        user = User.objects.get(id=id)

    except User.DoesNotExist:

        return Response({
            "error": "User not found"
        })

    serializer = UserSerializer(

        user,

        data=request.data,

        partial=True

    )

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(serializer.errors)